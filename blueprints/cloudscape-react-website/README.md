# About this blueprint

This blueprint creates a Cloudscape/React Single Page Application (SPA) with pre-configured integration (optional) to a Type-Safe API using constructs found in the AWS Project Development Kit ([AWS PDK](https://aws.github.io/aws-pdk/)).

## How does it work?

This blueprint generates a website for the PDK monorepo so that you can make authenticated API calls. You can associate an optional parameter (Type-Safe APIs blueprint) to automatically configure your website to set up an API Explorer which will allow you to make `sigv4` signed requests for your configured Type Safe API(s).

## Project resources

This blueprint creates the following key files and folders as part of your project.

```
.projen/   
    deps.json     -- installed dependencies
    files.json    --_TODO: Describe_
    tasks.json    --_TODO: Describe_
.public/   
    index.html    -- installed dependencies
    robots.txt    --_TODO: Describe_
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
.eslintrc.json    --_TODO: Describe_
.gitattributes    --_TODO: Describe_
.gitignore        --_TODO: Describe_
.npmignore        --_TODO: Describe_
.nxignore         --_TODO: Describe_
.prettierignore   --_TODO: Describe_
.prettierrc.json  --_TODO: Describe_
.projenrc.ts      -- where your packages are defined
.syncpackrc.json  --_TODO: Describe_
LICENCE           --_TODO: Describe_
README.md         --_TODO: Describe_
package.json      -- dependency declarations (managed by projen)
project.json
tsconfig.dev.json --_TODO: Describe_
tsconfig.json     --_TODO: Describe_
```

## Additional resources

For additional information about using the website, refer to the [PDK Developer Guide](https://aws.github.io/aws-pdk/developer_guides/type-safe-api/index.html).