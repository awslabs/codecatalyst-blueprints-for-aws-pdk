# About this blueprint

This blueprint creates a React-based website built using [Cloudscape](https://cloudscape.design/) that comes pre-integrated with Cognito Auth optionally configured Type Safe APIs, using constructs found in the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)). This provides you with the ability to call your API securely.

For example, this is a website generated in CodeCatalyst using PDK blueprints.

![Sample Website](https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/cloudscape-react-website/assets/project-website.png?raw=true)

## How does it work?

This blueprint generates a website for the PDK monorepo where you can associate an optional parameter (Type Safe APIs blueprint) to automatically configure your website to set up an API Explorer. This will allow you to make `sigv4` signed requests for your configured Type Safe APIs. In addition, it configures generated type-safe React hooks to interact with your API programmatically.

## Prerequisites

Ensure that you have an existing PDK Monorepo project.

## Apply and configure the blueprint

1. Navigate to the PDK Monorepo project, and from the left, select **Blueprints**.
2. On the Blueprints page, click **Apply blueprint**. The Apply blueprint page displays.
3. From the CodeCatalyst blueprints page, select **PDK - Cloudscape React Website** and click **Next**.
![](https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/cloudscape-react-website/assets/select-website.png?raw=true)
4. Complete the following:
    - Select the **target version** for your blueprint. While this is optional, we recommend using the latest version.
    - Enter a **name** for your website.
    - From the Type Safe APIs dropdown, select the API(s) you want to integrate within the website.
![](https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/cloudscape-react-website/assets/apply-react-website-blueprint.png?raw=true)
5. Click **Apply blueprint** to apply the Cloudscape React Website blueprint to your monorepo project. CodeCatalyst will automatically create a pull request.
6. Merge the pending pull request to apply the blueprint. A new `packages/website` folder is added which contains all the source code for your new website.

## Project resources

This blueprint creates the following key files and folders as part of your project.

```text
.projen/
    deps.json     -- installed dependencies
    files.json
    tasks.json
.public/
    index.html    -- installed dependencies
    robots.txt
.src/
    components/ - generated documentation in the formats you specified
        Auth/   -- only generated if an API is selected
        RuntimeContext/  -- only generated if an API is selected
        TypeSafeApiClientProvider/  -- only generated if an API is selected
    hooks/
    layouts/
        App/
        Routes/
    pages/
        ApiExplorer/ -- only generated if an API is selected
        Home/
    config.json
    index.tsx
    react-app-env.d.ts
    setupTests.ts
```

## Additional resources

For additional information about using the website, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/cloudscape-react-ts-website/index.html).