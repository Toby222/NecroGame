import * as Transformations from "./Transformations";

import { Model } from "../components/Model";

export class Flags extends Map<StaticFlag, any> {
  get(flag: StaticFlag) {
    return super.get(flag);
  }

  set(flag: StaticFlag, value: any) {
    return super.set(flag, value);
  }
}

export type StaticFlag = typeof Flag;
export class Flag {
  protected static transformations: Transformations.Transformation[];
  static onSet(model: Model, value: any) {}
  static onClear(model: Model) {}
}

export class TransformationFlag extends Flag {
  static is(flag: typeof Flag): flag is typeof TransformationFlag {
    return flag.transformations !== undefined;
  }
  protected static transformations: Transformations.Transformation[];
  static onSet(model: Model, value: any) {
    for (const transformation of this.transformations) {
      transformation.apply(model);
    }
  }

  static onClear(model: Model) {
    for (const transformation of this.transformations) {
      transformation.clear(model);
    }
  }

  static performEffects(model: Model) {
    for (const transformation of this.transformations) {
      transformation.perform(model);
    }
  }
}

export class AlterTimeFactor extends Flag {}

export class AlterTime extends TransformationFlag {
  static transformations = [new Transformations.AlterTime()];
}
