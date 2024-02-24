import { MetricUnits, Metrics } from '@aws-lambda-powertools/metrics';
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
  InvokeAgentRequest,
  InvokeAgentResponse,
} from '@aws-sdk/client-bedrock-agent-runtime';
import { ResponseStream, streamifyResponse } from 'lambda-stream';

import { config } from '@config';
import { ValidationError } from '@errors/validation-error';
import { logger } from '@shared/index';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

const metrics = new Metrics();
const client = new BedrockAgentRuntimeClient();

const agentId = config.get('agentId');
const agentAliasId = config.get('agentAliasId');

function parseBase64(message: Uint8Array): string {
  return Buffer.from(message).toString('utf-8');
}

export const queryModelAdapter = async (
  { body }: APIGatewayProxyEventV2,
  responseStream: ResponseStream
): Promise<void> => {
  try {
    responseStream.setContentType('application/json');

    if (!body) throw new ValidationError('no payload body');
    const request = JSON.parse(body);

    const { sessionAttributes, promptSessionAttributes, sessionId, prompt } =
      request;

    const input: InvokeAgentRequest = {
      sessionState: {
        sessionAttributes,
        promptSessionAttributes,
      },
      agentId,
      agentAliasId,
      sessionId,
      inputText: prompt,
    };

    const command: InvokeAgentCommand = new InvokeAgentCommand(input);
    const response: InvokeAgentResponse = await client.send(command);

    const chunks = [];
    const completion = response.completion || [];

    for await (const chunk of completion) {
      if (chunk.chunk && chunk.chunk.bytes) {
        const parsed = parseBase64(chunk.chunk.bytes);

        chunks.push(parsed);
      }
    }

    const returnMessage = {
      sessionId: response.sessionId,
      contentType: response.contentType,
      message: chunks.join(' '),
    };

    metrics.addMetric('SuccessfulQueryModel', MetricUnits.Count, 1);

    // Note: In the example we are not streaming, we are using the FURL request timeout feature
    // but we could easily write the stream during the for loop if we wanted to
    responseStream.write(returnMessage);
    responseStream.end();
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) errorMessage = error.message;
    logger.error(errorMessage);

    metrics.addMetric('QueryModelError', MetricUnits.Count, 1);

    responseStream.end();
    throw error;
  }
  responseStream.end();
};

export const handler = streamifyResponse(queryModelAdapter);
