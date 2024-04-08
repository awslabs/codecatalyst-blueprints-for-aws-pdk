# About this blueprint

This blueprint creates DevOps workflows compatible with constructs found in the ([AWS PDK](https://aws.github.io/aws-pdk/)). For example, this is a workflow generated in CodeCatalyst using PDK blueprints.

## How does it work?

This blueprint generates the required DevOps workflows for pull requests, releases and deployment of your project, using the AWS account and role specified in the configuration.

## Prerequisites

Ensure that you have set up a PDK Monorepo project, and have set up an Infrastructure blueprint for the monorepo project.

## Set up the blueprint

1. Navigate to the PDK Monorepo project, and from the left, select **Blueprints**.
3. On the Blueprints page, click **Apply blueprint**. The Apply blueprint page displays.
4. From the CodeCatalyst blueprints page, select **PDK - DevOps** and click **Next**.
<img src="https://github.com/awslabs/codecatalyst-blueprints-for-aws-pdk/blob/main/blueprints/devops/assets/apply-devops-blueprint.png?raw=true"/>
5. Complete the following:
    - Select the **target version** for your blueprint. You can select a specific version from the dropdown. While this is optional, we recommend using the latest version.
    - Choose to **bootstrap CDK** in the current environment.
    - Enter a **name** for your AWS CloudFormation stack. It should match the stack name configured in PDK - Infrastructure.
    - From the AWS account connection dropdown, select the **AWS account** to be used for the resources.
    - From the role dropdown, select the **IAM role** to be used for deploying your project application.
    - Select the **Region** where you want to deploy your monorepo project.
6. Click **Apply blueprint** to apply the Devops blueprint to your monorepo project. CodeCatalyst will automatically create a pull request.
7. Merge the pending pull request to apply the blueprint. A new `codecatalyst/workflows` folder is created within your monorepo project.

## Project resources

This blueprint creates the following key files and folders as part of your project.

```text
.codecatalyst/   
    workflows/
        pr.yaml  
        release.yaml
approved-licenses.yaml
```