import * as Resources from "./Resources";
import * as Actions from "./Actions";
import * as Flags from "./Flags";

export class BaseButton {
  static visible = false;
  static toString(): string {
    throw new Error("Not implemented.");
  }
  // This is a getter to avoid having to load Actions before Button, and vice versa.
  static get actions(): Actions.Action[] {
    throw new Error("Not implemented.");
  }
}

export class Wait extends BaseButton {
  static visible = true;
  static toString() {
    return "Wait 1 Second";
  }

  static get actions(): Actions.Action[] {
    return [new Actions.PassTime(1)];
  }
}

export class AlterTime extends BaseButton {
  static visible = true;
  static toString() {
    return "Reverse time";
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
    return "Return time to normal";
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
  static visible = true;
  static toString() {
    return "Dig in the dirt";
  }

  static get actions() {
    return [
      new Actions.AddResourceValue(
        Resources.Dirt,
        Math.floor(Math.random() * 10 + 1)
      ),
      new Actions.AddResourceValue(Resources.Bones, Math.round(Math.random())),
    ];
  }
}
