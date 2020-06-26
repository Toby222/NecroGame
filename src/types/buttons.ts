import { Action } from './actions'
import { BoolFlag } from './flags'
import { Resource } from './resource'

export type ButtonID = number;

export interface Button {
  action: Action[];
}

export class Button {
  static Wait = new class Wait implements Button {
    toString () { return 'Wait 1 Second' }
    action = [
      new Action.Noop()
    ]
  }()

  static ActivateOxygen = new class ActivateOxygen implements Button {
    toString () { return 'Activate Oxygen' }
    action = [
      new Action.SetBoolFlag(BoolFlag.OxygenMonitor),
      new Action.SetResourceValue(Resource.Oxygen, 1000),
      new Action.SetBoolFlag(BoolFlag.LeakyTank),
      new Action.AddMessage('Oxygen Monitor Up'),
      new Action.AddMessage('Losing 10 Oxygen per second - tank leaky'),
      new Action.DisableButton(1),
      new Action.EnableButton(2),
      new Action.EnableButton(5)
    ]
  }()

  static OpenToolbox = new class OpenToolbox implements Button {
    toString () { return 'Search Toolbox' }
    action= [
      new Action.AddMessage('You unceremoniously dump the toolbox contents all over the ship'),
      new Action.EnableButton(3),
      new Action.EnableButton(4),
      new Action.DisableButton(2)
    ]
  }()

  static ApplyTape = new class ApplyTape implements Button {
    toString () { return 'Apply Scotch Tape to Tank' }
    action = [
      new Action.ClearBoolFlag(BoolFlag.LeakyTank),
      new Action.AddMessage('Leak stopped - for now.'),
      new Action.DisableButton(3)
    ]
  }()

  static FiddleControls = new class FiddleControls implements Button {
    toString () { return 'Mess with the control panel' }
    action =[
      new Action.SetResourceValue(Resource.Power, 1),
      new Action.SetBoolFlag(BoolFlag.PowerRegen),
      new Action.AddMessage('You hear a loud bang from the bottom of the ship'),
      new Action.AddMessage('Your fuel cells are on and recharging from your excess oxygen'),
      new Action.DisableButton(4)
    ]
  }()

  static OpenDoor = new class OpenDoor implements Button {
    toString () { return 'Open Airlock' }
    action=[
      new Action.AddMessage('You push the airlock open and immediately DIE.'),
      new Action.AddMessage('Just kidding - everything is fine.'),
      new Action.SetResourceValue(Resource.Chutzpah, 50),
      new Action.AddTile(1),
      new Action.DisableButton(5)
    ]
  }()

  static byIndex (idx: ButtonID): Button | undefined {
    switch (idx) {
      case 0:
        return Button.Wait
      case 1:
        return Button.ActivateOxygen
      case 2:
        return Button.OpenToolbox
      case 3:
        return Button.ApplyTape
      case 4:
        return Button.FiddleControls
      case 5:
        return Button.OpenDoor
      default:
        return undefined
    }
  }
}

export type Buttons = ButtonID[]
