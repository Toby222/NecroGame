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

export const ActivateOxygen = new (class ActivateOxygen extends Button {
  protected actionsCache?: Actions.Action[];
  toString() {
    return "Activate Oxygen";
  }

  get actions(): Actions.Action[] {
    return [
      new Actions.SetResourceValue(Resources.Oxygen, 1000),
      new Actions.SetBoolFlag(BoolFlags.LeakyTank),
      new Actions.AddMessage("Oxygen Monitor Up"),
      new Actions.AddMessage("Losing 10 Oxygen per second - tank leaky"),
      new Actions.EnableButton(OpenToolbox),
      new Actions.EnableButton(OpenDoor),
      new Actions.DisableButton(this),
      new Actions.Wait(1),
    ];
  }
})();

export const OpenToolbox = new (class OpenToolbox extends Button {
  protected actionsCache?: Actions.Action[];
  toString() {
    return "Search Toolbox";
  }

  get actions(): Actions.Action[] {
    return [
      new Actions.AddMessage(
        "You unceremoniously dump the toolbox contents all over the ship"
      ),
      new Actions.EnableButton(ApplyTape),
      new Actions.EnableButton(FiddleControls),
      new Actions.DisableButton(this),
      new Actions.Wait(1),
    ];
  }
})();

export const ApplyTape = new (class ApplyTape extends Button {
  protected actionsCache?: Actions.Action[];
  toString() {
    return "Apply Scotch Tape to Tank";
  }

  get actions(): Actions.Action[] {
    return [
      new Actions.ClearBoolFlag(BoolFlags.LeakyTank),
      new Actions.DisableButton(this),
      new Actions.Wait(1),
      new Actions.AddMessage("Leak stopped - for now."),
    ];
  }
})();

export const FiddleControls = new (class FiddleControls extends Button {
  protected actionsCache?: Actions.Action[];
  toString() {
    return "Mess with the control panel";
  }

  get actions(): Actions.Action[] {
    return [
      new Actions.SetResourceValue(Resources.Power, 0),
      new Actions.SetBoolFlag(BoolFlags.PowerRegen),
      new Actions.DisableButton(this),
      new Actions.Wait(1),
      new Actions.AddMessage(
        "You hear a loud bang from the bottom of the ship"
      ),
      new Actions.AddMessage(
        "Your fuel cells are on and recharging from your excess oxygen"
      ),
    ];
  }
})();

export const OpenDoor = new (class OpenDoor extends Button {
  protected actionsCache?: Actions.Action[];
  toString() {
    return "Open Airlock";
  }

  get actions(): Actions.Action[] {
    return [
      new Actions.AddMessage("You tell the airlock to start cycling."),
      new Actions.AddMessage(
        "However it doesn't detect you wearing safety equipment and refuses."
      ),
      new Actions.Wait(5),
      new Actions.SetResourceValue(Resources.Chutzpah, 50),
      new Actions.DisableButton(this),
    ];
  }
})();
