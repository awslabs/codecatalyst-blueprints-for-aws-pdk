import { CloudscapeReactWebsiteBlueprint } from "./projenrc/blueprints/cloudscape-react-website";
import { DevOpsBlueprint } from "./projenrc/blueprints/devops";
import { InfraBlueprint } from "./projenrc/blueprints/infra";
import { MonorepoBlueprint } from "./projenrc/blueprints/monorepo";
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

monorepo.synth();
