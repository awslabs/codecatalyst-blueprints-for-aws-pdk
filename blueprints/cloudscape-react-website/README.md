# About this blueprint

This blueprint creates a Cloudscape/React Single Page Application (SPA) with pre-configured integration (optional) with a Type Safe API using constructs found in the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)).

## How does it work?

This blueprint generates a website for the PDK monorepo so that you can make authenticated API calls. You can associate an optional parameter (Type Safe APIs blueprint) to automatically configure your website to set up an API Explorer which will allow you to make `sigv4` signed requests for your configured Type Safe API(s).

## Prerequisites

Ensure that you have set up a PDK monorepo project, and applied the Type Safe API blueprint to the monorepo project.

## Apply and configure the blueprint

1. From the Projects page, select **PDK - Monorepo**. The monorepo project summary page displays.
2. On the page, from the left, select **Blueprints**.
3. On the Blueprints page, click **Apply blueprint**. The Apply blueprint page displays.
4. From the CodeCatalyst blueprints page, select **PDK - Cloudscape React Website** and click **Next**.
5. Complete the following:
    - Select the **target version** for your blueprint. You can select a specific version from the dropdown.
    - Enter a **name** for your website.
    - From the Type-Safe APIs dropdown, select the **API blueprint** you want to integrate within the website. For example, PDK - Type Safe API.
    <img src="assets/images/website-blueprint.png"/>
6. Click **Apply blueprint** to apply the Cloudscape React Website blueprint to your monorepo project. A new `packages/website` folder is added which contains all the source code for your new website.

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
        Auth/
        RuntimeContext/
        TypeSafeApiClientProvider/
    hooks/
    layouts/
        App/
        Routes/
    pages/
        ApiExplorer/
        Home/
    config.json
    index.tsx
    react-app-env.d.ts
    setupTests.ts
```

## Additional resources

For additional information about using the website, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/type-safe-api/index.html).