import * as Resources from "./Resource";
import * as Actions from "./Actions";
import * as Flags from "./Flags";

import { Model } from "../components/Model";

export abstract class Transformation {
  abstract perform(model: Model): void;
  abstract apply(model: Model): void;
  abstract clear(model: Model): void;
}

export const Generate = class Generate extends Transformation {
  private resource: Resources.Resource;
  private delta: number;

  constructor(resource: Resources.Resource, delta: number) {
    super();

    this.resource = resource;
    this.delta = delta;
  }

  perform(model: Model) {
    new Actions.AddResourceValue(this.resource, this.delta).perform(model);
  }

  apply(model: Model) {
    new Actions.AddResourceDelta(this.resource, this.delta).perform(model);
  }

  clear(model: Model) {
    new Actions.AddResourceDelta(this.resource, -this.delta).perform(model);
  }
};

export const Consume = class Consume extends Transformation {
  private resource: Resources.Resource;
  private delta: number;

  constructor(resource: Resources.Resource, delta: number) {
    super();

    this.resource = resource;
    this.delta = -delta;
  }

  perform(model: Model) {
    new Actions.AddResourceValue(this.resource, this.delta).perform(model);
  }

  apply(model: Model) {
    new Actions.AddResourceDelta(this.resource, this.delta).perform(model);
  }

  clear(model: Model) {
    new Actions.AddResourceDelta(this.resource, -this.delta).perform(model);
  }
};

export const AlterTime = class ExampleTransformation extends Transformation {
  constructor() {
    super();
  }

  perform(model: Model): void {
    console.log(
      "Performing RevertTime Transformation. Factor:",
      model.flags.get(Flags.AlterTimeFactor)
    );
    model.time.seconds += (model.flags.get(Flags.AlterTimeFactor) ?? 0) - 1;
  }

  apply(_model: Model): void {
    console.log("Applying RevertTime Transformation");
  }

  clear(_model: Model): void {
    console.log("Clearing RevertTime Transformation");
  }
};
