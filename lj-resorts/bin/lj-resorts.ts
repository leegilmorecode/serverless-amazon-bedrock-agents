#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { LjResortsStatefulStack } from '../stateful/stateful';
import { LjResortsStatelessStack } from '../stateless/stateless';

const app = new cdk.App();
new LjResortsStatefulStack(app, 'LjResortsStatefulStack', {
  // we deploy to us-east-1 as eu-west-1 is not available currently for Bedrock
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1' },
});
new LjResortsStatelessStack(app, 'LjResortsStatelessStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1' },
});
