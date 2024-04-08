# About this blueprint

This blueprint creates a root-level project that manages interdependencies between projects within the monorepo, using the constructs from the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)).

The monorepo submodule provides several `projen` project types in either Typescript, Python or Java that can configure a NX monorepo to manage all your packages. When used, these project types enable polyglot builds, declarative dependency management, build caching, dependency visualization, and other features. The [AWS PDK](https://aws.github.io/aws-pdk/) itself uses the monorepo submodule and is a good reference for seeing how to set up a complex, polyglot monorepo.

## PDK Blueprint ecosystem

After you have generated a Monorepo project, you can apply these additional PDK blueprints to the project:

- [Type Safe API](/blueprints/type-safe-api/README.md): Add API capabilities to your Monorepo project.
- [Cloudscape React Website](/blueprints/cloudscape-react-website/README.md): Generate a website for the Monorepo so that you can make authenticated API calls.
- [Infrastructure](/blueprints/infra/README.md): Pre-configured CDK code to deploy your website and API.
- [DevOps](/blueprints/devops/README.md): Generate the required DevOps workflows for pull requests, releases, and deployment of your project.

## How does it work?

The blueprint sets up a root project as a monorepo using [NX](https://nx.dev/getting-started/intro), and manages all of the NX configuration for you by default. Depending on the language you bootstrap your project with, a `projenrc` file (in your preferred language) allows you to add new sub-packages, by applying blueprints to your project.

## Set up the blueprint

1. From the CodeCatalyst blueprints page, search for, and select **PDK - Monorepo** and choose **Next**. The **Create Project** page displays.
<img src="https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/monorepo/assets/create-pdk-monorepo.png?raw=true"/>
2. On the page, complete the following:
    - **Project name**: Enter a name for your project.
    - **Primary programming language**: Select the language you want to develop your project code in. You can select from TypeScript, Java, or Python.
    - Under **Code Configuration**,
        - Select an existing repository, or enter a name to create a new repository.
        - Select a **Package Manager** (for TypeScript code only). You can choose from BUN, PNPM, YARN_BERRY, or NPM.
3. Click **Create project** to create your monorepo project. This will create the root level project that manages interdependencies between projects within the monorepo, provides build caching and dependency visualization.

**Note**: This blueprint only generates the foundations of the project. To create a workable website using the blueprint, you will need to add other PDK blueprints such as [Type Safe API](/blueprints/type-safe-api/README.md), [Website](/blueprints/cloudscape-react-website/README.md), [Infrastructure](/blueprints/infra/README.md) or [DevOps](/blueprints/devops/README.md) to create a full-stack application.

## Project resources

This blueprint creates the following key files as part of your project.

```text
.projen/   
    deps.json     -- installed dependencies
    files.json    
    tasks.json    
.eslintrc.json    
.gitattributes    
.gitignore        
.npmignore        
.nxignore         
.prettierignore   
.prettierrc.json  
.projenrc.ts      -- where your packages are defined
.syncpackrc.json  
LICENCE           
README.md         
devfile.yaml      
nx.json           -- nx config (this file is managed by projen)
package.json      -- dependency declarations (managed by projen)
tsconfig.dev.json 
tsconfig.json
```

## Additional resources

For additional information about using the monorepo features and resources, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/monorepo/index.html).