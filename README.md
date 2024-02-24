# Serverless Amazon Bedrock Agents

Increasing productivity through Amazon Bedrock Agent automation, with examples written in TypeScript and the AWS CDK.

**NOTE: Deploying this solution is not free, and is at least $700 per month**

![image](./docs/images/header.png)

The article can be found here: https://medium.com/@leejamesgilmore/automating-tasks-using-amazon-bedrock-agents-and-ai-4b6fb8856589

## Getting started

**NOTE: This is a basic example and is not production ready.**

1. cd into the `lj-resorts` folder and run `npm run deploy:stateful`
2. once complete, cd into the `lj-resorts` folder and run `npm run deploy:stateless`
3. You will also need to sync the knowledge base on the first occassion by using the console.

## Removing Stacks

1. cd into the `lj-resorts` folder and run `npm run remove:stateless`
2. once complete, cd into the `lj-resorts` folder and run `npm run remove:stateful`
3. In the console perform a sync for the first time.
