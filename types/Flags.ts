import * as Transformations from "./Transformations";

import { Model } from "../components/Model";

export class Flags extends Map<AnyFlag, any> {
  get<T = any>(flag: AnyFlag) {
    return super.get(flag) as T;
  }

  set<T = any>(flag: AnyFlag, value: T) {
    return super.set(flag, value);
  }
}

/**
 * Type used to reference a generic Flag more easily
 *
 * Equal to `typeof Flag`
 */
export type AnyFlag = typeof Flag;

/**
 * Generic Type of a Flag
 *
 * Should not be used on its own, only to be extended on!
 */
export abstract class Flag {
  /**
   * Called when the Flag gets assigned a new value
   *
   * @param model The model that the Flag was applied to
   * @param value The value that the Flag was assigned
   */
  static onSet(model: Model, value: any) {}
  /**
   * Called when the Flag gets reset
   *
   * @param model The model that the Flag was reset on
   */
  static onClear(model: Model) {}
}

/**
 * A {@link Flag} with an additional list of {@link Transformation}s that get applied when its value is true-ish
 */
export class TransformationFlag extends Flag {
  static is(flag: typeof Flag): flag is typeof TransformationFlag {
    return (flag as any).transformations !== undefined;
  }
  protected static transformations: Transformations.Transformation[];
  static onSet(model: Model, value: any) {
    if (Boolean(value)) {
      for (const transformation of this.transformations) {
        transformation.apply(model);
      }
    }
  }

  static onClear(model: Model) {
    for (const transformation of this.transformations) {
      transformation.clear(model);
    }
  }

  /**
   * Perform all of the transformations of this Flag
   * @param model The Model to perform the effects on
   */
  static performEffects(model: Model) {
    for (const transformation of this.transformations) {
      transformation.perform(model);
    }
  }
}

// Game flags

export class AlterTimeFactor extends Flag {}

export class AlterTime extends TransformationFlag {
  static transformations = [new Transformations.AlterTime()];
}

export class Paused extends Flag {}
