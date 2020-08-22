import * as Actions from "./Actions";
import * as Flags from "./Flags";
import * as Resources from "./Resource";

export abstract class Button {
  // This is a getter to avoid having to load Actions before Button, and vice versa.
  abstract get actions(): Actions.Action[];
  abstract toString(): string;
}

export const Wait = new (class Wait extends Button {
  toString() {
    return "Wait 1 Second";
  }

  get actions(): Actions.Action[] {
    return [new Actions.Wait(1)];
  }
})();

export const RevertTime = new (class ExampleButton extends Button {
  toString() {
    return "Reverse time";
  }

  get actions(): Actions.Action[] {
    return [
      new Actions.SetFlag(Flags.RevertTime, true),
      new Actions.DisableButton(this),
      new Actions.EnableButton(ReturnTime),
    ];
  }
})();

export const ReturnTime = new (class OtherExampleButton extends Button {
  toString() {
    return "Return time to normal";
  }

  get actions(): Actions.Action[] {
    return [
      new Actions.SetFlag(Flags.RevertTime, false),
      new Actions.DisableButton(this),
      new Actions.EnableButton(RevertTime),
    ];
  }
})();
