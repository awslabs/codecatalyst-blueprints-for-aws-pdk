import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";
import { PDKSynth } from "../components/pdk-synth";

export class InfraBlueprint extends PDKBlueprint {
  constructor(parent: MonorepoTsProject, synth: PDKSynth) {
    super(parent, {
      packageName: "infra",
      displayName: "PDK - Infrastructure",
      description:
        "This blueprint creates a CDK infrastructure package using constructs found in the AWS Project Development Kit (AWS PDK).",
      keywords: ["pdk", "devops", "cdk"],
    });

    this.addDeps("@aws/pdk", synth.package.packageName);
  }
}
