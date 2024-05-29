/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { CloudscapeReactWebsiteBlueprint } from "./projenrc/blueprints/cloudscape-react-website";
import { DevOpsBlueprint } from "./projenrc/blueprints/devops";
import { InfraBlueprint } from "./projenrc/blueprints/infra";
import { MonorepoBlueprint } from "./projenrc/blueprints/monorepo";
import { PDKBlueprint } from "./projenrc/blueprints/pdk";
import { TestPDKBlueprints } from "./projenrc/blueprints/test-pdk-blueprints";
import { TypeSafeApiBlueprint } from "./projenrc/blueprints/type-safe-api";
import { PDKSynth } from "./projenrc/components/pdk-synth";
import { PDKBlueprintsProject } from "./projenrc/pdk-blueprints";

const monorepo = new PDKBlueprintsProject();

// Components
const pdkSynth = new PDKSynth(monorepo);

// Blueprints
new DevOpsBlueprint(monorepo, pdkSynth);
new MonorepoBlueprint(monorepo, pdkSynth);
new InfraBlueprint(monorepo, pdkSynth);
new TypeSafeApiBlueprint(monorepo, pdkSynth);
new CloudscapeReactWebsiteBlueprint(monorepo, pdkSynth);
new PDKBlueprint(monorepo, pdkSynth);

new TestPDKBlueprints(monorepo);

monorepo.synth();
