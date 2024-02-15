import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";

export class DevOpsBlueprint extends PDKBlueprint {
  constructor(parent: MonorepoTsProject) {
    super(parent, {
      packageName: "devops",
      displayName: "PDK - DevOps",
      description:
        "This blueprint creates DevOps workflows compatible with constructs found in the AWS Project Development Kit (AWS PDK).",
    });
  }
}
