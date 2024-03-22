# About this blueprint

This blueprint sets up the infrastructure to deploy the projects components into the AWS cloud, using a CDK infrastructure package from constructs in the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)).

## How does it work?

The blueprint sets up a folder containing all of your pre-configured CDK code to deploy your website and API. You can specify the Type Safe API and website to be configured for the monorepo project.

## Project resources

This blueprint creates the following key files as part of your project.

```
infra/
    main/
        .projen/   
            deps.json     -- installed dependencies
            files.json    --_TODO: Describe_
            tasks.json    --_TODO: Describe_
        .gitattributes    --_TODO: Describe_
        .gitignore        --_TODO: Describe
        package.json      -- dependency declarations (managed by projen)
        project.json
```

## Additional resources

For additional information about using the infrastructure features and resources, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/infrastructure/index.html).