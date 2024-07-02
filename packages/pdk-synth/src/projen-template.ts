export const projenrcMap: {[lang: string]: {path: string; content: string}} = {
  java: {
    path: 'src/test/java/projenrc.java',
    content: `import software.aws.pdk.monorepo.MonorepoJavaProject;
import software.aws.pdk.monorepo.MonorepoJavaOptions;
{{#cloudscapeReactTsWebsites.0}}import software.aws.pdk.cloudscape_react_ts_website.CloudscapeReactTsWebsiteProject;
import software.aws.pdk.cloudscape_react_ts_website.CloudscapeReactTsWebsiteProjectOptions;
{{/cloudscapeReactTsWebsites.0}}{{#hasInfra}}import software.aws.pdk.infrastructure.InfrastructureJavaProject;{{#hasStages}}
import software.aws.pdk.infrastructure.DeploymentStage;{{/hasStages}}
import software.aws.pdk.infrastructure.InfrastructureJavaProjectOptions;{{/hasInfra}}
{{#typeSafeApis.0}}
import software.aws.pdk.type_safe_api.*;
{{/typeSafeApis.0}}
import java.util.Arrays;

public class projenrc {
    public static void main(String[] args) {
        MonorepoJavaProject monorepo = new MonorepoJavaProject(MonorepoJavaOptions.builder()
                .name("monorepo")
                .build());

{{#typeSafeApis}}
        TypeSafeApiProject {{{apiNameLowercase}}} = new TypeSafeApiProject(TypeSafeApiProjectOptions.builder()
                .name("{{{apiNameLowercase}}}")
                .parent(monorepo)
                .outdir("packages/apis/{{{apiNameLowercase}}}")
                .model(ModelConfiguration.builder()
                        .language({{{apiModelLanguage}}})
                        .options(ModelOptions.builder()
                                {{#isSmithy}}.smithy(SmithyModelOptions.builder()
                                        .serviceName(SmithyServiceName.builder()
                                                .namespace("{{{apiNamespace}}}")
                                                .serviceName("{{{apiName}}}")
                                                .build())
                                        .build()){{/isSmithy}}{{^isSmithy}}.openapi(OpenApiModelOptions.builder()
                                    .title("{{{apiNamespace}}}.{{{apiName}}}")
                                    .build()){{/isSmithy}}
                                .build())
                        .build())
                .infrastructure(InfrastructureConfiguration.builder()
                        .language({{{apiCdkLanguage}}})
                        .build())
                .documentation(DocumentationConfiguration.builder()
                        .formats(Arrays.asList({{{apiDocumentationFormats}}}))
                        .build())
                .library(LibraryConfiguration.builder()
                        .libraries(Arrays.asList(Library.TYPESCRIPT_REACT_QUERY_HOOKS))
                        .build())
                .handlers(HandlersConfiguration.builder()
                        .languages(Arrays.asList({{{apiHandlerLanguages}}}))
                        .build())
                .build());

{{/typeSafeApis}}                
{{#cloudscapeReactTsWebsites}}
        CloudscapeReactTsWebsiteProject {{{websiteNameLowercase}}} = new CloudscapeReactTsWebsiteProject(
            CloudscapeReactTsWebsiteProjectOptions.builder()
                .parent(monorepo)
                .outdir("packages/websites/{{{websiteNameLowercase}}}")
                .typeSafeApis(Arrays.asList({{{typeSafeApiNames}}}))
                .name("{{{websiteNameLowercase}}}")
                .applicationName("{{{websiteName}}}")
                .allowSignup({{{allowSignup}}})
                .build());

{{/cloudscapeReactTsWebsites}}
{{#hasInfra}}
        new InfrastructureJavaProject(
            InfrastructureJavaProjectOptions.builder()
                .parent(monorepo)
                .outdir("packages/infra/main")
                .name("infra")
                .groupId("infra")
                .artifactId("infra")
                .typeSafeApis(Arrays.asList({{{typeSafeApiNames}}}))
                .cloudscapeReactTsWebsites(Arrays.asList({{{cloudscapeReactTsWebsiteNames}}}))
                .allowSignup({{{allowSignup}}}){{#hasStages}}
                .stages(Arrays.asList(
                {{#stages}}
                    DeploymentStage.builder()
                        .stageName("{{{stageName}}}")
                        .account({{{account}}}L)
                        .region("{{{region}}}")
                        .build(){{^isLast}},
                    {{/isLast}}
                {{/stages}}
                
                ))
                {{/hasStages}}.build());

{{/hasInfra}}
        monorepo.synth();
    }
}`,
  },
  typescript: {
    path: '.projenrc.ts',
    content: `{{#cloudscapeReactTsWebsites.0}}import { CloudscapeReactTsWebsiteProject } from "@aws/pdk/cloudscape-react-ts-website";
{{/cloudscapeReactTsWebsites.0}}{{#hasInfra}}import { InfrastructureTsProject } from "@aws/pdk/infrastructure";
{{/hasInfra}}import { MonorepoTsProject } from "@aws/pdk/monorepo";
{{#typeSafeApis.0}}
import {
    {{{#hasApiDocumentation}}}DocumentationFormat,
    {{{/hasApiDocumentation}}}Language,
    Library,
    ModelLanguage,
    TypeSafeApiProject,
} from "@aws/pdk/type-safe-api";
{{/typeSafeApis.0}}import { javascript } from "projen";

const monorepo = new MonorepoTsProject({
    name: "monorepo",
    packageManager: javascript.NodePackageManager.{{{packageManager}}},{{#isYarnBerry}}
    yarnBerryOptions: {{{yarnBerryOptions}}},{{/isYarnBerry}}
    projenrcTs: true,{{#licenseOptions}}
    licenseOptions: {
      {{{keyCamel}}}: \`{{{value}}}\`,
    },{{/licenseOptions}}
});

{{#typeSafeApis}}
const {{{apiNameLowercase}}} = new TypeSafeApiProject({
    parent: monorepo,
    outdir: "packages/apis/{{{apiNameLowercase}}}",
    name: "{{{apiNameLowercase}}}",
    infrastructure: {
        language: {{{apiCdkLanguage}}},
    },
    model: {
        language: {{{apiModelLanguage}}},
        options: {
            {{#isSmithy}}smithy: {
                serviceName: {
                    namespace: "{{{apiNamespace}}}",
                    serviceName: "{{{apiName}}}",
                },
            },{{/isSmithy}}{{^isSmithy}}openapi: {
                title: "{{{apiNamespace}}}.{{{apiName}}}",
            }{{/isSmithy}}
        },
    },
    documentation: {
        formats: [{{{apiDocumentationFormats}}}],
    },
    library: {
        libraries: [Library.TYPESCRIPT_REACT_QUERY_HOOKS],
    },
    handlers: {
        languages: [{{{apiHandlerLanguages}}}],
    },
});

{{/typeSafeApis}}
{{#cloudscapeReactTsWebsites}}
const {{{websiteNameLowercase}}} = new CloudscapeReactTsWebsiteProject({
    parent: monorepo,
    outdir: "packages/websites/{{{websiteNameLowercase}}}",
    name: "{{{websiteNameLowercase}}}",
    applicationName: "{{{websiteName}}}",
    typeSafeApis: [{{{typeSafeApiNames}}}],
    allowSignup: {{{allowSignup}}},
});

{{/cloudscapeReactTsWebsites}}
{{#hasInfra}}
new InfrastructureTsProject({
    parent: monorepo,
    outdir: "packages/infra/main",
    name: "infra",
    cloudscapeReactTsWebsites: [{{{cloudscapeReactTsWebsiteNames}}}],
    typeSafeApis: [{{{typeSafeApiNames}}}],
    allowSignup: {{{allowSignup}}},{{#hasStages}}
    stages: [
      {{#stages}}{
        stageName: "{{{stageName}}}",
        account: {{{account}}},
        region: "{{{region}}}",
      },{{^isLast}} {{/isLast}}{{/stages}}
    ],{{/hasStages}}
});

{{/hasInfra}}
monorepo.synth();`,
  },
  python: {
    path: '.projenrc.py',
    content: `from aws_pdk.monorepo import MonorepoPythonProject{{#hasLicenseOptions}}, LicenseOptions{{/hasLicenseOptions}}
{{#cloudscapeReactTsWebsites.0}}from aws_pdk.cloudscape_react_ts_website import CloudscapeReactTsWebsiteProject
{{/cloudscapeReactTsWebsites.0}}{{#hasInfra}}from aws_pdk.infrastructure import {{#hasStages}}DeploymentStage, {{/hasStages}}InfrastructurePyProject{{/hasInfra}}{{#typeSafeApis.0}}
from aws_pdk.type_safe_api import *{{/typeSafeApis.0}}

monorepo = MonorepoPythonProject(
    module_name="monorepo",
    name="monorepo",{{#hasLicenseOptions}}
    license_options=LicenseOptions(
      {{#licenseOptions}}
        {{{keySnake}}}="""{{{value}}}"""{{^isLast}},{{/isLast}}
      {{/licenseOptions}}
    )
    {{/hasLicenseOptions}}
)

{{#typeSafeApis}}
{{{apiNameLowercase}}} = TypeSafeApiProject(
    name="{{{apiNameLowercase}}}",
    parent=monorepo,
    outdir="packages/apis/{{{apiNameLowercase}}}",
    model=ModelConfiguration(
        language={{{apiModelLanguage}}},
        options=ModelOptions(
            {{#isSmithy}}smithy=SmithyModelOptions(
                service_name=SmithyServiceName(
                    namespace="{{{apiNamespace}}}",
                    service_name="{{{apiName}}}"
                )
            ){{/isSmithy}}{{^isSmithy}}openapi=OpenApiModelOptions(
                title="{{{apiNamespace}}}.{{{apiName}}}"
            ){{/isSmithy}}
        )
    ),
    infrastructure=InfrastructureConfiguration(
        language={{{apiCdkLanguage}}}
    ),
    documentation=DocumentationConfiguration(
        formats=[{{{apiDocumentationFormats}}}]
    ),
    handlers=HandlersConfiguration(
        languages=[{{{apiHandlerLanguages}}}]
    ),
    library=LibraryConfiguration(
        libraries=[Library.TYPESCRIPT_REACT_QUERY_HOOKS]
    )
)

{{/typeSafeApis}}
{{#cloudscapeReactTsWebsites}}
{{{websiteNameLowercase}}} = CloudscapeReactTsWebsiteProject(
    parent=monorepo,
    outdir="packages/websites/{{{websiteNameLowercase}}}",
    type_safe_apis=[{{{typeSafeApiNames}}}],
    name="{{{websiteNameLowercase}}}",
    application_name="{{{websiteName}}}",
    allow_signup={{#allowSignup}}True{{/allowSignup}}{{^allowSignup}}False{{/allowSignup}}
)

{{/cloudscapeReactTsWebsites}}
{{#hasInfra}}
InfrastructurePyProject(
    parent=monorepo,
    outdir="packages/infra/main",
    name="infra",
    cloudscape_react_ts_websites=[{{{cloudscapeReactTsWebsiteNames}}}],
    type_safe_apis=[{{{typeSafeApiNames}}}],
    allow_signup={{#allowSignup}}True{{/allowSignup}}{{^allowSignup}}False{{/allowSignup}}{{#hasStages}},
    stages=[
      {{#stages}}DeploymentStage(
        stage_name="{{{stageName}}}",
        account={{{account}}},
        region="{{{region}}}"
      ){{^isLast}}, {{/isLast}}{{/stages}}
    ]{{/hasStages}}
)

{{/hasInfra}}
monorepo.synth()`,
  },
};