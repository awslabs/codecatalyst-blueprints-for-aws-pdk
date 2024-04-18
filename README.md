# CodeCatalyst Blueprints for AWS-PDK 

This repository contains PDK based CodeCatalyst Blueprints.

The blueprints can be found under `blueprints/*`
- Blueprint cloudscape-react-website
- Blueprint devops
- Blueprint infra
- Blueprint monorepo
- Blueprint type-safe-api

Public documentation on the pdk can be found [here](https://aws.github.io/aws-pdk/).

# Usage Guide

## Prerequisites

1. [Install NVM](https://github.com/nvm-sh/nvm#installing-and-updating) if you haven't already

2. Run the following command:
```
npm install -g pnpm npm@10.5.0 @aws/pdk
```

## Install & Build

Run the following:

```
pdk install
pdk build --parallel [number of cores]
```

# License

Refer to [License](./LICENSE)

# Contributing

Refer to [Contributing](CONTRIBUTING.md)