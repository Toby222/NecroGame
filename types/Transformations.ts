import * as Resources from "./Resources";
import * as Actions from "./Actions";
import * as Flags from "./Flags";

import { Model } from "../components/Model";

export interface Transformation {
  perform(model: Model): void;
  apply(model: Model): void;
  clear(model: Model): void;
}

export class Generate<T extends typeof Resources.BaseResource>
  implements Transformation {
  private resource: T;
  private delta: number;

  constructor(resource: T, delta: number) {
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
}

export class Consume<T extends typeof Resources.BaseResource>
  implements Transformation {
  private resource: T;
  private delta: number;

  constructor(resource: T, delta: number) {
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
}

export class AlterTime implements Transformation {
  constructor() {}

  perform(model: Model): void {
    console.log(
      "Performing AlterTime Transformation. Factor:",
      model.flags.get(Flags.AlterTimeFactor)
    );
    model.time.seconds += (model.flags.get(Flags.AlterTimeFactor) ?? 0) - 1;
  }

  apply(_model: Model): void {
    console.log("Applying AlterTime Transformation");
  }

  clear(_model: Model): void {
    console.log("Clearing AlterTime Transformation");
  }
}
