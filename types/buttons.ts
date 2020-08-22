import * as Actions from "./actions";
import * as BoolFlags from "./flags";
import * as Resources from "./resource";

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
