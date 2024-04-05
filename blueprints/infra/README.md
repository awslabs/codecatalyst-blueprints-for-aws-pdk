# About this blueprint

This blueprint creates a project that sets up all CDK-related infrastructure needed to deploy your application, using the constructs in the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)). It also comes preconfigured to generate a diagram based on your CDK code every time you build.

For example, this is the infrastructure generated in CodeCatalyst using PDK blueprints.
<img src="https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/infra/assets/infra-generated-diagram.png"/>

## How does it work?

The blueprint sets up a package containing all of your pre-configured CDK code to deploy your website and API. You can specify the Type Safe API and website to be configured for the monorepo project.

## Prerequisites

Ensure that you have an existing PDK Monorepo project and PDK infrastructure code built for the project.

## Set up the blueprint

1. Navigate to the PDK Monorepo project, and from the left, select **Blueprints**.
2. On the Blueprints page, click **Apply blueprint**. The Apply blueprint page displays.
3. From the CodeCatalyst blueprints page, select **PDK - Infrastructure** and click **Next**.
<img src="https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/infra/assets/apply-infra-blueprint.png?raw=true"/>
4. Complete the following:
    - Select the **target version** for your blueprint. You can select a specific version from the dropdown. While this is optional, we recommend using the latest version.
    - Select the **CDK language** you want to develop your infrastructure with. You can select from TypeScript, Java, or Python.
    - Enter a **name** for your AWS CloudFormation stack.
    - From the Type Safe APIs dropdown, select the **API** you want to associate and generate CDK code for. For example, PDK - Type Safe API.
    - From the Cloudscape React TS websites dropdown, select the **website** blueprint you want to deploy with your infrastructure. For example, PDK - Cloudscape React Website.
5. Click **Apply blueprint** to apply the Infra blueprint to your monorepo project. CodeCatalyst will automatically create a pull request.
6. Merge the pending pull request to apply the blueprint. A new `packages/infra` folder is created within your monorepo project which contains the infrastructure that will deploy your project into the AWS cloud.

## Project resources

This blueprint creates the following key files as part of your project.

```text
infra/
    main/
        .projen/   
            deps.json     -- installed dependencies
            files.json    
            tasks.json    
        .src/   
            constructs/   -- installed dependencies, only if selected
                apis/
                websites/
            stacks/
            test/
        .eslintrc.json    
        .gitattributes    
        .gitignore        
        .npmignore        
        .nxignore         
        .prettierignore   
        .prettierrc.json  
        .projenrc.ts      -- where your packages are defined
        LICENCE           
        README.md         
        cdk.json          
        package.json      -- dependency declarations (managed by projen)
        project.json      
        tsconfig.dev.json
        tsconfig.json     
```

## Additional resources

For additional information about using the infrastructure features and resources, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/infrastructure/index.html).