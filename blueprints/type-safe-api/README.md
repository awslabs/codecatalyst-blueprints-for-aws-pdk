# About this blueprint

This blueprint creates a type-safe API using constructs from the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)), and provides:

- a mechanism which allows you to define an API using either Smithy or OpenAPI v3
- build-time code generation to allow you to implement and interact with your API in a type-safe manner
- a construct which manages deploying this API in an API Gateway.

Supports TypeScript, Java and Python, and any combination of these languages for CDK infrastructure, server-side implementation, or client-side interaction.

## How does it work?

Given your API definition, this blueprint generates the following at build-time:

- clients for interacting with your API in multiple languages,
- server-side code for implementing your API in multiple languages,
- a type-safe CDK construct to deploy your API and configure automatic input validation,
- React hooks for interacting with your API from a React website, and
- documentation in multiple formats.

You can apply this blueprint to an existing PDK Monorepo project for extending the API capabilities of a project.

## Prerequisites

Ensure that you have set up a PDK Monorepo project.

## Set up the blueprint

1. From the Projects page, select **PDK - Monorepo**. The monorepo project summary page displays.
2. On the page, from the left, select **Blueprints**.
3. On the Blueprints page, click **Apply blueprint**. The Apply blueprint page displays.
4. From the CodeCatalyst blueprints page, select **PDK - Type Safe API** and click **Next**.
![](https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/type-safe-api/assets/select-typesafeapi.png?raw=true)
1. Complete the following:
    - Select the **target version** for your blueprint. You can select a specific version from the dropdown. While this is optional, we recommend using the latest version.
    - Select the **model language** for your API model. You can select from Smithy or OpenAPI.
    - Enter a **namespace** for your API. A namespace is a way to group services for an application.
    - Enter a **name** for your API.
    - Select the language you want to support for the generated Lambda handlers. You can select from Typescript, Java, or Python. The Lambda handler is the method in your code that processes operations. You can select multiple languages.
    - Select the format for your API documentation. You can choose from HTML_REDOC, HTML2, MARKDOWN or PLANTUML. You can select multiple formats.
    ![](https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/type-safe-api/assets/apply-typesafeapi.png?raw=true)
2. Click **Apply blueprint** to apply the Type Safe API blueprint to your monorepo project. CodeCatalyst will automatically create a pull request.
3. Merge the pending pull request to apply the blueprint. A new `packages/apis/<API-NAME>` folder is created within your monorepo project which contains all of the API related source code for your configured Type Safe API.

## Project resources

This blueprint creates the following key files as part of your project.

```text
.projen/
    files.json
    tasks.json
generated/
    documentation/ - generated documentation in formats you specified
        html2
        html_redoc
        plantuml
        markdown
    infrastructure/ - generated infrastructure (you'll find only one directory in here based on your chosen infrastructure language)
        typescript
        python
        java
    libraries/ - generated libraries if specified
        typescript-react-query-hooks
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
            smithy - API definition if you chose ModelLanguage.SMITHY
            openapi - API definition if you chose ModelLanguage.OPENAPI
```

## Additional resources

For additional information about using type-safe API, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/type-safe-api/index.html).