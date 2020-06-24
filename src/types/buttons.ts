import { Action } from 'actions'
import { BoolFlag } from 'flags'
import { Resource } from 'resource'

export type ButtonID = number;

interface Button {
  action: Action[];
}

namespace Button {
  export class Wait implements Button {
    toString () { return 'Wait 1 Second' }
    action = [
      new Action.Noop()
    ]
  }
  export class ActivateOxygen implements Button {
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
  }
  export class OpenToolbox implements Button {
    toString () { return 'Search Toolbox' }
    action= [
      new Action.AddMessage('You unceremoniously dump the toolbox contents all over the ship'),
      new Action.EnableButton(3),
      new Action.EnableButton(4),
      new Action.DisableButton(2)
    ]
  }
  export class ApplyTape implements Button {
    toString () { return 'Apply Scotch Tape to Tank' }
    action = [
      new Action.ClearBoolFlag(BoolFlag.LeakyTank),
      new Action.AddMessage('Leak stopped - for now.'),
      new Action.DisableButton(3)
    ]
  }
  export class FiddleControls implements Button {
    toString () { return 'Mess with the control panel' }
    action =[
      new Action.SetResourceValue(Resource.Power, 1),
      new Action.SetBoolFlag(BoolFlag.PowerRegen),
      new Action.AddMessage('You hear a loud bang from the bottom of the ship'),
      new Action.AddMessage('Your fuel cells are on and recharging from your excess oxygen'),
      new Action.DisableButton(4)
    ]
  }
  export class OpenDoor implements Button {
    toString () { return 'Open Airlock' }
    action=[
      new Action.AddMessage('You push the airlock open and immediately DIE.'),
      new Action.AddMessage('Just kidding - everything is fine.'),
      new Action.SetResourceValue(Resource.Chutzpah, 50),
      new Action.AddTile(1),
      new Action.DisableButton(5)
    ]
  }
}

export function by_index (idx: ButtonID): Button | undefined {
  switch (idx) {
    case 0:
      return new Button.Wait()
    case 1:
      return new Button.ActivateOxygen()
    case 2:
      return new Button.OpenToolbox()
    case 3:
      return new Button.ApplyTape()
    case 4:
      return new Button.FiddleControls()
    case 5:
      return new Button.OpenDoor()
    default:
      return undefined
  }
}

export type Buttons = ButtonID[]
