import * as Actions from './actions'
import * as BoolFlags from './flags'
import * as Resources from './resource'

export abstract class Button {
  protected abstract actionsCache?: Actions.Action[]
  abstract get actions(): Actions.Action[]
  abstract toString(): string
}

export const Wait = new class Wait extends Button {
  protected actionsCache?: Actions.Action[]
  toString () { return 'Wait 1 Second' }

  get actions (): Actions.Action[] {
    this.actionsCache = this.actionsCache ?? [ new Actions.Wait(1) ]
    return this.actionsCache
  }
}()

export const ActivateOxygen = new class ActivateOxygen extends Button {
  protected actionsCache?: Actions.Action[]
  toString () { return 'Activate Oxygen' }

  get actions (): Actions.Action[] {
    if (this.actionsCache === undefined) {
      this.actionsCache = [
        new Actions.SetResourceValue(Resources.Oxygen, 1000),
        new Actions.SetBoolFlag(BoolFlags.LeakyTank),
        new Actions.AddMessage('Oxygen Monitor Up'),
        new Actions.AddMessage('Losing 10 Oxygen per second - tank leaky'),
        new Actions.EnableButton(OpenToolbox),
        new Actions.EnableButton(OpenDoor),
        new Actions.DisableButton(this),
        new Actions.Wait(1)
      ]
    }
    return this.actionsCache
  }
}()

export const OpenToolbox = new class OpenToolbox extends Button {
  protected actionsCache?: Actions.Action[]
  toString () { return 'Search Toolbox' }

  get actions (): Actions.Action[] {
    if (this.actionsCache === undefined) {
      this.actionsCache = [
        new Actions.AddMessage('You unceremoniously dump the toolbox contents all over the ship'),
        new Actions.EnableButton(ApplyTape),
        new Actions.EnableButton(FiddleControls),
        new Actions.DisableButton(this),
        new Actions.Wait(1)
      ]
    }
    return this.actionsCache
  }
}()

export const ApplyTape = new class ApplyTape extends Button {
  protected actionsCache?: Actions.Action[]
  toString () { return 'Apply Scotch Tape to Tank' }

  get actions (): Actions.Action[] {
    if (this.actionsCache === undefined) {
      this.actionsCache = [
        new Actions.ClearBoolFlag(BoolFlags.LeakyTank),
        new Actions.DisableButton(this),
        new Actions.Wait(1),
        new Actions.AddMessage('Leak stopped - for now.')
      ]
    }
    return this.actionsCache
  }
}()

export const FiddleControls = new class FiddleControls extends Button {
  protected actionsCache?: Actions.Action[]
  toString () { return 'Mess with the control panel' }

  get actions () : Actions.Action[] {
    if (this.actionsCache === undefined) {
      this.actionsCache = [
        new Actions.SetResourceValue(Resources.Power, 0),
        new Actions.SetBoolFlag(BoolFlags.PowerRegen),
        new Actions.DisableButton(this),
        new Actions.Wait(1),
        new Actions.AddMessage('You hear a loud bang from the bottom of the ship'),
        new Actions.AddMessage('Your fuel cells are on and recharging from your excess oxygen')
      ]
    }
    return this.actionsCache
  }
}()

export const OpenDoor = new class OpenDoor extends Button {
  protected actionsCache?: Actions.Action[]
  toString () { return 'Open Airlock' }

  get actions (): Actions.Action[] {
    if (this.actionsCache === undefined) {
      this.actionsCache = [
        new Actions.AddMessage('You tell the airlock to start cycling.'),
        new Actions.AddMessage('However it doesn\'t detect you wearing safety equipment and refuses.'),
        new Actions.Wait(5),
        new Actions.SetResourceValue(Resources.Chutzpah, 50),
        new Actions.DisableButton(this)
      ]
    }
    return this.actionsCache
  }
}()
