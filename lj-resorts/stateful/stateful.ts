import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';

import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';
import { Construct } from 'constructs';

export class LjResortsStatefulStack extends cdk.Stack {
  public bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // constants
    const serviceName = 'LjResortsService';
    const metricNamespace = 'LjResorts';

    // add our lambda config
    const lambdaConfig = {
      LOG_LEVEL: 'DEBUG',
      POWERTOOLS_LOGGER_LOG_EVENT: 'true',
      POWERTOOLS_LOGGER_SAMPLE_RATE: '1',
      POWERTOOLS_TRACE_ENABLED: 'enabled',
      POWERTOOLS_TRACER_CAPTURE_HTTPS_REQUESTS: 'captureHTTPsRequests',
      POWERTOOLS_SERVICE_NAME: serviceName,
      POWERTOOLS_TRACER_CAPTURE_RESPONSE: 'captureResult',
      POWERTOOLS_METRICS_NAMESPACE: metricNamespace,
    };

    // create the lambda for the agent - this is the lambda that determines
    // what the prompt looks like with regards to mapping to the schema
    const actionGroupAgentLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'AgentLambda', {
        functionName: 'action-group-executor',
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          './src/adapters/primary/action-group-executor/action-group-executor.adapter.ts'
        ),
        memorySize: 1024,
        handler: 'handler',
        timeout: cdk.Duration.minutes(5),
        description: 'action group lambda function',
        architecture: lambda.Architecture.ARM_64,
        tracing: lambda.Tracing.ACTIVE,
        bundling: {
          minify: true,
        },
        environment: {
          ...lambdaConfig,
        },
      });
    actionGroupAgentLambda.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    // create the bedrock knowledge base for our resort company data
    const kb = new bedrock.KnowledgeBase(this, 'BedrockKnowledgeBase', {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
      instruction: `Please help our customers with queries on hotel opening hours and prices, spa prices, special offers and room cancellation policies`,
    });

    // create the bedrock agent
    const agent = new bedrock.Agent(this, 'BedrockAgent', {
      name: 'Agent',
      description: 'The agent for hotels, Spa and golf bookings.',
      foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2,
      instruction:
        'Please help our customers to book hotel rooms, spa sessions and golf bookings; whilst providing them with any special offers depending on the day and booking type, make them aware of any opening times or prices before they complete the booking, and also take into consideration our hotel policies.',
      idleSessionTTL: cdk.Duration.minutes(10),
      knowledgeBases: [kb],
      shouldPrepareAgent: true,
      aliasName: 'Agent',
    });

    // add the action group for making bookings
    new bedrock.AgentActionGroup(this, 'AgentActionGroup', {
      actionGroupName: 'agent-action-group',
      description: 'The action group for making a booking',
      agent: agent,
      apiSchema: bedrock.S3ApiSchema.fromAsset(
        path.join(__dirname, './schema/api-schema.json')
      ),
      actionGroupState: 'ENABLED',
      actionGroupExecutor: actionGroupAgentLambda,
      shouldPrepareAgent: true,
    });

    // create the s3 bucket which houses our company data as a source for the bedrock knowledge base
    this.bucket = new s3.Bucket(this, 'CompanyDataBucket', {
      bucketName: 'lj-resorts-data-bucket',
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ensure that the data is uploaded as part of the cdk deploy i.e. our pdfs
    new s3deploy.BucketDeployment(this, 'ClientBucketDeployment', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../data/'))],
      destinationBucket: this.bucket,
    });

    // set the data source of the s3 bucket for the knowledge base
    const dataSource = new bedrock.S3DataSource(this, 'DataSource', {
      bucket: this.bucket,
      knowledgeBase: kb,
      dataSourceName: 'resorts-data',
      chunkingStrategy: bedrock.ChunkingStrategy.DEFAULT,
      maxTokens: 500,
      overlapPercentage: 20,
    });

    new cdk.CfnOutput(this, 'DataSourceIdOutput', {
      value: dataSource.dataSourceId,
      exportName: 'DataSourceIdOutput',
    });

    new cdk.CfnOutput(this, 'KnowledgeBaseIdOutput', {
      value: kb.knowledgeBaseId,
      exportName: 'KnowledgeBaseIdOutput',
    });

    new cdk.CfnOutput(this, 'KnowledgeBaseArnOutput', {
      value: kb.knowledgeBaseArn,
      exportName: 'KnowledgeBaseArnOutput',
    });

    new cdk.CfnOutput(this, 'AgentArnOutput', {
      value: agent.agentArn,
      exportName: 'AgentArnOutput',
    });

    new cdk.CfnOutput(this, 'AgentIdOutput', {
      value: agent.agentId,
      exportName: 'AgentIdOutput',
    });

    new cdk.CfnOutput(this, 'AgentAliasIdOutput', {
      value: agent.aliasId as string,
      exportName: 'AgentAliasIdOutput',
    });
  }
}
