# Sample project to store tasks in AWS DynamoDB using Serverless Framework -> Node 6

Circli.CI integration

ESLint

Tests setup with one sample

Logger setup

Config setup

Coverage Setup

Build and Release scripts

utility dependencies setup

Serverless Scafolding

Simple service example

serverless.yml (with stage support)

local test support

### Requirements

- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To create a new Serverless project.

``` bash
$ serverless install --url git_url --name my-project
```

Enter the new directory

``` bash
$ cd my-project
```

Install the Node.js packages

``` bash
$ npm install
```

### Usage

To run unit tests on your local

``` bash
$ npm test
```

To run a function on your local

``` bash
$ serverless invoke local --function hello
```

Install DynamoDB Local

``` bash
  npm install dynamodb
$ npm install --save serverless-dynamodb-local
```

Add DynamoDB Resource definitions to your Serverless configuration, as defined [here](https://serverless.com/framework/docs/providers/aws/guide/resources/#configuration) 

### AWS::DynamoDB::Table Resource Template for serverless.yml
```yml
resources:
  Resources:
    usersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: taskTable
        AttributeDefinitions:
          - AttributeName: name
            AttributeType: S
        KeySchema:
          - AttributeName: description
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

You can either start DynamoDB locally yourself:

``` bash
$ sls dynamodb start
```

Or configure to start it by serverless

```yml
custom:
  dynamodb:
    start:
      port: 8000
      inMemory: true
      migrate: true
      seed: true
    # Uncomment only if you already have a DynamoDB running locally
    # noStart: true
```


To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

Run your tests

``` bash
$ npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```

To add another function as a new file to your project, simply add the new file and add the reference to `serverless.yml`. The `webpack.config.js` automatically handles functions in different files.

To add environment variables to your project

1. Rename `env.example` to `env.yml`.
2. Add environment variables for the various stages to `env.yml`.
3. Uncomment `environment: ${file(env.yml):${self:provider.stage}}` in the `serverless.yml`.
4. Make sure to not commit your `env.yml`.

### Configuring your permissions in AWS

[Policy Generator](https://github.com/dancrumb/generator-serverless-policy)

Remember the best practice on production enviroment:
[IAM Permissions](https://serverless.com/blog/abcs-of-iam-permissions/)

``` bash
Fast but risky (aka YOLO): The fastest way to get started with Serverless 
is to create an IAM user with Administrator Access. This IAM user will have 
full access to your AWS account and should not be used for your 
company's production"
```

