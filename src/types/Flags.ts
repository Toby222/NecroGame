import * as Transformations from "./Transformations";

import { Game } from "../components/Game";

export class Flags extends Map<Flag<unknown>, unknown> {
  get<T>(flag: Flag<T>) {
    return super.get(flag) as T | undefined;
  }

  set<T>(flag: Flag<T>, value: T) {
    return super.set(flag, value);
  }
}

/**
 * Generic Type of a Flag
 */
export abstract class Flag<T> {
  /**
   * Get the static instance of the Flag
   *
   * needed as static classes aren't a thing in TS
   */
  static get Instance(): Flag<unknown> {
    throw new Error("Not implemented on base class!");
  }
  /**
   * Called when the Flag gets assigned a new value
   *
   * @param game The game that the Flag was applied to
   * @param value The value that the Flag was assigned
   */
  abstract onSet(game: Game, value: T): void;
  /**
   * Called when the Flag gets reset
   *
   * @param game The game that the Flag was reset on
   */
  abstract onClear(game: Game): void;
}

/**
 * A {@link Flag} with an additional list of {@link Transformation}s that get applied when its value is true
 */
export abstract class TransformationFlag extends Flag<boolean> {
  protected abstract transformations: Transformations.Transformation[];
  static is(flag: Flag<boolean>): flag is TransformationFlag {
    return Object.keys(flag).includes("transformations");
  }
  onSet(model: Game, value: boolean) {
    if (value) {
      for (const transformation of this.transformations) {
        transformation.apply(model);
      }
    }
  }

  onClear(model: Game) {
    for (const transformation of this.transformations) {
      transformation.clear(model);
    }
  }

  /**
   * Perform all of the transformations of this Flag
   * @param model The Model to perform the effects on
   */
  performEffects(model: Game) {
    for (const transformation of this.transformations) {
      transformation.perform(model);
    }
  }
}

// Game flags

export class AlterTimeFactor extends Flag<number> {
  private static _instance: AlterTimeFactor;
  static get Instance(): Flag<number> {
    return this._instance || (this._instance = new this());
  }
  onSet(): void {
    return;
  }
  onClear(): void {
    return;
  }
}

export class AlterTime extends TransformationFlag {
  private static _instance: AlterTime;
  static get Instance(): TransformationFlag {
    return this._instance || (this._instance = new this());
  }
  transformations = [new Transformations.AlterTime()];
}

export class Paused extends Flag<boolean> {
  private static _instance: Paused;
  static get Instance(): Flag<boolean> {
    return this._instance || (this._instance = new this());
  }
  onSet(): void {
    return;
  }
  onClear(): void {
    return;
  }
}
