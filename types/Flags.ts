import * as Resources from "./Resource";
import * as Transformations from "./Transformations";

import { Model } from "../components/Model";

export class Flags extends Map<Flag, any> {
  get<T>(flag: Flag<T>) {
    return super.get(flag) as T | undefined;
  }

  set<T>(flag: Flag<T>, value: T) {
    return super.set(flag, value);
  }
}

export interface Flag<T = any> {
  onSet(model: Model, value: T): void;
  onClear(model: Model): void;
}

export abstract class StringFlag implements Flag<string> {
  onSet(model: Model, value: string): void {}
  onClear(model: Model): void {}
}

export abstract class NumberFlag implements Flag<number> {
  onSet(model: Model, value: number): void {}
  onClear(model: Model): void {}
}

export abstract class BoolFlag implements Flag<boolean> {
  protected abstract transformations: Transformations.Transformation[];
  onSet(model: Model, value: boolean) {
    for (const transformation of this.transformations) {
      transformation.apply(model);
    }
  }

  onClear(model: Model) {
    for (const transformation of this.transformations) {
      transformation.clear(model);
    }
  }

  performEffects(model: Model) {
    for (const transformation of this.transformations) {
      transformation.perform(model);
    }
  }
}

export const AlterTimeFactor = new (class ExampleNumberFlag extends NumberFlag {
  onSet(model: Model, value: number) {
    super.onSet(model, value);
    console.log("Setting AlterTimeFactor flag. Value:", value);
  }
})();

export const AlterTime = new (class ExampleBoolFlag extends BoolFlag {
  protected transformations = [new Transformations.AlterTime()];
  onSet(model: Model, value: boolean) {
    super.onSet(model, value);
    console.log("Setting AlterTime flag. Value:", value);
  }
})();
