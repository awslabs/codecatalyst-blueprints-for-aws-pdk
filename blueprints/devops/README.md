# About this blueprint

This blueprint creates DevOps workflows compatible with constructs found in the ([AWS PDK](https://aws.github.io/aws-pdk/)). For example, this is a workflow generated in CodeCatalyst using PDK blueprints.
<img src="assets/images/devops-workflow.png"/>

## How does it work?

This blueprint generates the required DevOps workflows for pull requests, releases and deployment of your project, using the AWS account and role specified in the configuration.

## Prerequisites

Ensure that you have set up a PDK Monorepo project, and have set up an Infrastructure blueprint for the monorepo project.

## Set up the blueprint

1. Navigate to the PDK Monorepo project, and from the left, select **Blueprints**.
3. On the Blueprints page, click **Apply blueprint**. The Apply blueprint page displays.
4. From the CodeCatalyst blueprints page, select **PDK - DevOps** and click **Next**.
<img src="assets/images/select-devops.png"/>
5. Complete the following:
    - Select the **target version** for your blueprint. You can select a specific version from the dropdown.
    - Choose to **bootstrap CDK** in the current environment.
    - Enter a **name** for your AWS CloudFormation stack.
    - From the AWS account connection dropdown, select the **AWS account** to be used for the resources.
    - From the role dropdown, select the **IAM role** to be used for deploying your project application.
    - Select the **Region** where you want to deploy your monorepo project.
    <img src="assets/images/devops-blueprint.png"/>
6. Click **Apply blueprint** to apply the Devops blueprint to your monorepo project. CodeCatalyst will automatically create a pull request.
6. Merge the pending pull request to apply the blueprint. A new `codecatalyst/workflows` folder is created within your monorepo project.

## Project resources

This blueprint creates the following key files and folders as part of your project.

```text
.codecatalyst/   
    workflows/
        pr.yaml  
        release.yaml
approved-licenses.yaml
```