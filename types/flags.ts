import * as Resources from "./resource";
import * as Transformations from "./transformations";

import { Model } from "../components/model";

export class Flags extends Map<Flag<any>, any> {
  get<T>(flag: Flag<T>) {
    return super.get(flag) as T;
  }

  set<T>(flag: Flag<T>, value: T) {
    return super.set(flag, value);
  }
}

export interface Flag<T> {
  set(model: Model, value: T): void;
  clear(model: Model): void;
}

export abstract class StringFlag implements Flag<string> {
  set(model: Model, value: string): void {
    model.flags.set(this, value);
  }

  clear(model: Model): void {
    model.flags.delete(this);
  }
}

export abstract class NumberFlag implements Flag<number> {
  set(model: Model, value: number): void {
    model.flags.set(this, value);
  }

  clear(model: Model): void {
    model.flags.delete(this);
  }
}

export abstract class BoolFlag implements Flag<boolean> {
  protected abstract transformations: Transformations.Transformation[];
  set(model: Model) {
    for (const transformation of this.transformations) {
      transformation.apply(model);
    }
  }

  clear(model: Model) {
    for (const transformation of this.transformations) {
      transformation.clear(model);
    }
    model.flags.set(this, false);
  }

  performEffects(model: Model) {
    for (const transformation of this.transformations) {
      transformation.perform(model);
    }
  }
}
