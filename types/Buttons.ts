import * as Resources from "./Resources";
import * as Actions from "./Actions";
import * as Flags from "./Flags";

interface Stats {
  timesUsed: number;
}

export class BaseButton {
  static readonly cooldown: number = 0;
  static currentCooldown = 0;
  static visible = false;
  static active = true;
  static stats: Stats = { timesUsed: 0 };
  static toString(): string {
    throw new Error("Not implemented.");
  }
  // This is a getter to avoid having to load Actions before Button, and vice versa.
  static get actions(): Actions.Action[] {
    throw new Error("Not implemented.");
  }
}

export class AlterTime extends BaseButton {
  static visible = true;
  static toString() {
    return "Alter timeflow";
  }

  static get actions(): Actions.Action[] {
    return [
      new Actions.SetFlag(Flags.AlterTime, true),
      new Actions.DisableButton(this),
      new Actions.EnableButton(UnAlterTime),
    ];
  }
}

export class UnAlterTime extends BaseButton {
  static toString() {
    return "Normalize timeflow";
  }

  static get actions(): Actions.Action[] {
    return [
      new Actions.SetFlag(Flags.AlterTime, false),
      new Actions.DisableButton(this),
      new Actions.EnableButton(AlterTime),
    ];
  }
}

export class Dig extends BaseButton {
  static readonly cooldown = 5;
  static visible = true;
  static toString() {
    return "Dig in the dirt";
  }

  static get actions() {
    if (this.stats.timesUsed === 0) {
      return [
        new Actions.AddResourceValue(
          Resources.Dirt,
          Math.floor(Math.random() * 10 + 1)
        ),
        new Actions.AddResourceValue(Resources.Bones, 10),
        new Actions.EnableButton(SummonSkeleton),
        new Actions.AddMessage(
          "You find a bunch of bones just beneath the surface. Weird..."
        ),
      ];
    }
    return [
      new Actions.AddResourceValue(
        Resources.Dirt,
        Math.floor(Math.random() * 10 + 1)
      ),
      new Actions.AddResourceValue(Resources.Bones, Math.round(Math.random())),
    ];
  }
}

export class SummonSkeleton extends BaseButton {
  static readonly cooldown = 10;
  static visible = false;
  static get active() {
    return Resources.Bones.amount >= 5;
  }
  static toString() {
    return "Summon a digging Skeleton";
  }

  static get actions() {
    return [
      new Actions.AddResourceValue(Resources.Bones, -5),
      new Actions.AddResourceDelta(Resources.Dirt, 0.1),
    ];
  }
}
