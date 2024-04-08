/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";

const DEVOPS_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-devops";
const MONOREPO_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-monorepo";
const TYPESAFE_API_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-type-safe-api";
const WEBSITE_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-cloudscape-react-website";
const INFRA_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-infra";

export class TestPDKBlueprints extends PDKBlueprint {
  constructor(parent: MonorepoTsProject) {
    super(parent, {
      packageName: "test-pdk-blueprints",
      displayName: "PDK - Test Blueprints",
      description:
        "This blueprint tests all PDK blueprints. This should never be published.",
    });

    this.addDeps(
      DEVOPS_PACKAGE,
      MONOREPO_PACKAGE,
      TYPESAFE_API_PACKAGE,
      WEBSITE_PACKAGE,
      INFRA_PACKAGE
    );
  }
}
