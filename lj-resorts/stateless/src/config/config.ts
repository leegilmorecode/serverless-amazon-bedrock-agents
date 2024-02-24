const convict = require('convict');

export const config = convict({
  knowledgeBaseId: {
    doc: 'The ID of the Amazon Bedrock Knowledge Base',
    format: String,
    default: '',
    env: 'KNOWLEDGE_BASE_ID',
  },
  dataSourceId: {
    doc: 'The data source Id of the s3 bucket',
    format: String,
    default: '',
    env: 'DATA_SOURCE_ID',
  },
  agentId: {
    doc: 'The agent Id',
    format: String,
    default: '',
    env: 'AGENT_ID',
  },
  agentAliasId: {
    doc: 'The agent alias Id',
    format: String,
    default: '',
    env: 'AGENT_ALIAS_ID',
  },
}).validate({ allowed: 'strict' });
