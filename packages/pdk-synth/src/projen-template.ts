export const projenrcMap: {[lang: string]: {path: string; content: string}} = {
  java: {
    path: 'src/test/java/projenrc.java',
    content: `import software.aws.pdk.monorepo.MonorepoJavaProject;
import software.aws.pdk.monorepo.MonorepoJavaOptions;
{{#hasWebsite}}import software.aws.pdk.cloudscape_react_ts_website.CloudscapeReactTsWebsiteProject;
import software.aws.pdk.cloudscape_react_ts_website.CloudscapeReactTsWebsiteProjectOptions;
{{/hasWebsite}}{{#hasInfra}}import software.aws.pdk.infrastructure.InfrastructureJavaProject;
import software.aws.pdk.infrastructure.InfrastructureJavaProjectOptions;{{/hasInfra}}{{#hasApi}}
import software.aws.pdk.type_safe_api.*;
{{/hasApi}}import java.util.Arrays;

public class projenrc {
    public static void main(String[] args) {
        MonorepoJavaProject monorepo = new MonorepoJavaProject(MonorepoJavaOptions.builder()
                .name("monorepo")
                .build());

{{#hasApi}}
        TypeSafeApiProject api = new TypeSafeApiProject(TypeSafeApiProjectOptions.builder()
                .name("api")
                .parent(monorepo)
                .outdir("packages/api")
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
                        .language({{{apiLanguage}}})
                        .build())
                .documentation(DocumentationConfiguration.builder()
                        .formats(Arrays.asList(DocumentationFormat.HTML_REDOC))
                        .build())
                .library(LibraryConfiguration.builder()
                        .libraries(Arrays.asList(Library.TYPESCRIPT_REACT_QUERY_HOOKS))
                        .build())
                .handlers(HandlersConfiguration.builder()
                        .languages(Arrays.asList({{{apiLanguage}}}))
                        .build())
                .build());

{{/hasApi}}                
{{#hasWebsite}}
        CloudscapeReactTsWebsiteProject website = new CloudscapeReactTsWebsiteProject(
            CloudscapeReactTsWebsiteProjectOptions.builder()
                .parent(monorepo)
                .outdir("packages/website"){{#hasApi}}
                .typeSafeApi(api){{/hasApi}}
                .name("website")
                .build());

{{/hasWebsite}}
{{#hasInfra}}
        new InfrastructureJavaProject(
            InfrastructureJavaProjectOptions.builder()
                .parent(monorepo)
                .outdir("packages/infra/main")
                .name("infra"){{#hasApi}}
                .typeSafeApi(api){{/hasApi}}{{#hasWebsite}}
                .cloudscapeReactTsWebsite(website){{/hasWebsite}}
                .build());

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
    DocumentationFormat,
    Language,
    Library,
    ModelLanguage,
    TypeSafeApiProject,
} from "@aws/pdk/type-safe-api";
{{/typeSafeApis.0}}import { javascript } from "projen";

const monorepo = new MonorepoTsProject({
    name: "monorepo",
    packageManager: javascript.NodePackageManager.{{{packageManager}}},{{#isYarnBerry}}
    yarnBerryOptions: {{{yarnBerryOptions}}},{{/isYarnBerry}}
    projenrcTs: true,
});

{{#typeSafeApis}}
const {{{apiNameLowercase}}} = new TypeSafeApiProject({
    parent: monorepo,
    outdir: "packages/apis/{{{apiNameLowercase}}}",
    name: "{{{apiNameLowercase}}}",
    infrastructure: {
        language: {{{apiLanguage}}},
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
        formats: [DocumentationFormat.HTML_REDOC],
    },
    library: {
        libraries: [Library.TYPESCRIPT_REACT_QUERY_HOOKS],
    },
    handlers: {
        languages: [{{{apiLanguage}}}],
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
});

{{/cloudscapeReactTsWebsites}}
{{#hasInfra}}
new InfrastructureTsProject({
    parent: monorepo,
    outdir: "packages/infra/main",
    name: "infra",
    cloudscapeReactTsWebsites: [{{{cloudscapeReactTsWebsiteNames}}}],
    typeSafeApis: [{{{typeSafeApiNames}}}]
});

{{/hasInfra}}
monorepo.synth();`,
  },
  python: {
    path: '.projenrc.py',
    content: `from aws_pdk.monorepo import MonorepoPythonProject
{{#hasWebsite}}from aws_pdk.cloudscape_react_ts_website import CloudscapeReactTsWebsiteProject
{{/hasWebsite}}{{#hasInfra}}from aws_pdk.infrastructure import InfrastructurePyProject{{/hasInfra}}{{#hasApi}}
from aws_pdk.type_safe_api import *{{/hasApi}}

monorepo = MonorepoPythonProject(
    module_name="monorepo",
    name="monorepo",
)

{{#hasApi}}
api = TypeSafeApiProject(
    name="api",
    parent=monorepo,
    outdir="packages/api",
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
        language={{{apiLanguage}}}
    ),
    documentation=DocumentationConfiguration(
        formats=[DocumentationFormat.HTML_REDOC]
    ),
    handlers=HandlersConfiguration(
        languages=[{{{apiLanguage}}}]
    ),
    library=LibraryConfiguration(
        libraries=[Library.TYPESCRIPT_REACT_QUERY_HOOKS]
    )
)

{{/hasApi}}
{{#hasWebsite}}
website = CloudscapeReactTsWebsiteProject(
    parent=monorepo,
    outdir="packages/website",
    type_safe_api=api,
    name="website",
)

{{/hasWebsite}}
{{#hasInfra}}
InfrastructurePyProject(
    parent=monorepo,
    outdir="packages/infra/main",
    name="infra",{{#hasApi}}
    type_safe_api=api,{{/hasApi}}{{#hasWebsite}}
    cloudscape_react_ts_website=website{{/hasWebsite}}
)

{{/hasInfra}}
monorepo.synth()`,
  },
};