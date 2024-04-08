/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
export const assets: { [filepath: string]: string } = {
  "README.md": `# PDK Blueprints

This project was generated using a [Project Development Kit (PDK)](https://aws.github.io/aws-pdk/) blueprint for creating a monorepo, which provides building blocks for common development patterns together with the tools to manage and build your projects.

## Features
- [Devfile](https://docs.aws.amazon.com/codecatalyst/latest/userguide/devenvironment-devfile.html) containing all needed PDK dependencies, for example, Java, Python, and Node.
- [NX](https://nx.dev/) is configured to manage your monorepo, providing polyglot dependency management/visualization, build caching, and more.
- [Projen](https://projen.io/) is used to manage your Projects as Code (PaC).
- Support for Typescript, Python and Java.
- Provides the foundation for adding additional PDK related Blueprints.

## Applying additional PDK Blueprints

After you have set up the PDK monorepo project in CodeCatalyst, you can apply other PDK blueprints to the project to include additional functionality, resources, and governance. Your project supports various elements that are managed independently in separate blueprints. 

Note: With PDK monorepo projects, we recommend applying PDK blueprints in the following order, as these blueprints have dependencies on each other:

1. PDK - Type Safe API
2. PDK - Cloudscape React Website
3. PDK - Infrastructure
4. PDK - DevOps

Refer to the [tutorial](https://todo) on how to create a project using composable PDK blueprints.

## Development workflow

### Installation

Whenever you add new dependencies or load up a project for the first time, you need to install your dependencies. To do this, run the following command:

\`pdk install\`

The \`pdk\` command is a convenience which will delegate to your chosen package manager i.e. if pnpm is used it would be equivalent to running \`pnpm i\`.

You can also install your dependencies using a lockfile (recommended for CI environments) via the following command:

\`pdk install:ci\`

### Managing dependencies via Projen

Refer to https://aws.github.io/aws-pdk/developer_guides/monorepo/dependencies.html

### Visualizing dependencies

Refer to https://aws.github.io/aws-pdk/developer_guides/monorepo/dependency_visualization.html

### Building your codebase

Refer to https://aws.github.io/aws-pdk/developer_guides/monorepo/building.html

### Caching

Refer to https://aws.github.io/aws-pdk/developer_guides/monorepo/caching.html

## Additional resources

Refer to https://aws.github.io/aws-pdk/developer_guides/monorepo/index.html
`,
};
