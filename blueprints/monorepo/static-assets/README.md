# PDK Blueprints

## Getting started with the PDK Monorepo

This project was generated using a [Project Development Kit (PDK)](https://aws.github.io/aws-pdk/) blueprint for creating a monorepo, which provides building blocks for common development patterns together with the tools to manage and build your projects.

From the PDK monorepo project overview page, you can:

* [Add](https://docs.aws.amazon.com/codecatalyst/latest/userguide/source-repositories-create.html) or [link](https://docs.aws.amazon.com/codecatalyst/latest/userguide/source-repositories-link.html) source repositories,
* View and create [workflows](https://docs.aws.amazon.com/codecatalyst/latest/userguide/flows.html),
* Create new [pull requests](https://docs.aws.amazon.com/codecatalyst/latest/userguide/source-pull-requests.html),
* Manage your [developer environments](https://docs.aws.amazon.com/codecatalyst/latest/userguide/devenvironment.html), and
* View and manage [issues](https://docs.aws.amazon.com/codecatalyst/latest/userguide/issues.html) created against your project.

!!! Note

    The PDK Monorepo Blueprint generates a devfile containing all needed PDK dependencies, for example, Java, Python, and Node.

## Applying PDK blueprints

After you have set up the PDK monorepo project in CodeCatalyst, you can apply other PDK blueprints to the project to include additional functional components, resources, and governance. Your project supports various elements that are managed independently in separate blueprints. 

Note: With PDK monorepo projects, we recommend applying PDK blueprints in the following order, as these blueprints have dependencies on each other:

1. PDK - Type Safe API
2. PDK - Cloudscape React Website
3. PDK - Infra
4. PDK - DevOps

## Next steps

Refer to the tutorial on how to create a project using PDK blueprints.
