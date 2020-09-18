import * as Resources from "./Resources";
import * as Actions from "./Actions";
import * as Flags from "./Flags";

import { Model } from "../components/Model";

export interface Transformation {
  /**
   * Perform the actions of this transformation.
   *
   * Gets called every tick that the Transformation is active.
   *
   * @param model Model to use for the Transformation
   */
  perform(model: Model): void;
  /**
   * Initialize this transformation.
   *
   * Should only get called once.
   *
   * @param model Model to use for the Transformation
   */
  apply(model: Model): void;
  /**
   * Clear this transformation.
   *
   * Should only get called once.
   *
   * @param model Model to use for the Transformation
   */
  clear(model: Model): void;
}

export class Generate<T extends typeof Resources.BaseResource>
  implements Transformation {
  private resource: T;
  private delta: number;

  /**
   * Generate some amount of some resource every second
   * @param resource The resource to generate
   * @param delta The amount to generate
   */
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

/**
 * Consume some amount of some resource every second
 * @param resource The resource to generate
 * @param delta The amount to generate
 * @typeParam ResourceType (inferred from parameter resource)
 */
export class Consume<ResourceType extends typeof Resources.BaseResource>
  implements Transformation {
  private resource: ResourceType;
  private delta: number;

  constructor(resource: ResourceType, delta: number) {
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

/**
 * Changes by how the Model's Time gets changed whenever one second passes
 */
export class AlterTime implements Transformation {
  private static fast = false;
  perform(model: Model) {
    if (AlterTime.fast) return;
    const ticks = model.flags.get<number>(Flags.AlterTimeFactor) ?? 0;
    for (let i = ticks - 1; i > 0; i--) {
      AlterTime.fast = true;
      model.tick();
      AlterTime.fast = false;
    }
  }

  apply(_model: Model) {}

  clear(_model: Model) {}
}
