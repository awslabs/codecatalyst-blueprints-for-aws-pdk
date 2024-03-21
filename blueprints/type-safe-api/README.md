# About this blueprint

This blueprint creates a type-safe API using constructs from the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)), and provides:

- a projen project type which allows you to define an API using either Smithy or OpenAPI v3, and
- a construct which manages deploying this API in an API Gateway.

Using Smithy or OpenAPI V3 allows you to use features such as generated client and server types, infrastructure, documentation, and automatic input validation.

## How does it work?

This blueprint generates runtime projects from your API definition in your desired languages, which include clients for interacting with your API, and server-side code for implementing your API. The project also generates a type-safe CDK construct which ensures an integration is provided for every API operation.

!!! note

    The code is generated at build time, so when you change your API model, you will need to rebuild to see your changes reflected in the generated code.

## Project resources

This blueprint creates the following key files as part of your project.

_TODO: Check this for PDK blueprints across languages_

```
.projen/
    files.json --_TODO: Describe_
    tasks.json --_TODO: Describe_
generated/
    documentation/ - generated documentation in the formats you specified
        html2
        html_redoc
        plantuml
        markdown
    infrastructure/ - generated infrastructure (you'll find only one directory in here based on your chosen infrastructure language)
        typescript
        python
        java 
    libraries/ - generated libraries if specified       typescript-react-query-hooks
    runtime/ - generated types, client, and server code in the languages you specified
        typescript
        python
        java
handlers/
    typescript - lambda handlers for operations you choose to implement in TypeScript
    python - lambda handlers for operations you choose to implement in Python
    java - lambda handlers for operations you choose to implement in Java
model/
    src/
        main/
            smithy - your API definition if you chose ModelLanguage.SMITHY
            openapi - your API definition if you chose ModelLanguage.OPENAPI
```

## Additional resources

For additional information about using type-safe API, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/type-safe-api/index.html).