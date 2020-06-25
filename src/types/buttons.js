import { Action } from 'actions'
import { BoolFlag } from 'flags'
import { Resource } from 'resource'
var Button;
(function (Button) {
  class Wait {
    constructor () {
      this.action = [
        new Action.Noop()
      ]
    }

    toString () { return 'Wait 1 Second' }
  }
  Button.Wait = Wait
  class ActivateOxygen {
    constructor () {
      this.action = [
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

    toString () { return 'Activate Oxygen' }
  }
  Button.ActivateOxygen = ActivateOxygen
  class OpenToolbox {
    constructor () {
      this.action = [
        new Action.AddMessage('You unceremoniously dump the toolbox contents all over the ship'),
        new Action.EnableButton(3),
        new Action.EnableButton(4),
        new Action.DisableButton(2)
      ]
    }

    toString () { return 'Search Toolbox' }
  }
  Button.OpenToolbox = OpenToolbox
  class ApplyTape {
    constructor () {
      this.action = [
        new Action.ClearBoolFlag(BoolFlag.LeakyTank),
        new Action.AddMessage('Leak stopped - for now.'),
        new Action.DisableButton(3)
      ]
    }

    toString () { return 'Apply Scotch Tape to Tank' }
  }
  Button.ApplyTape = ApplyTape
  class FiddleControls {
    constructor () {
      this.action = [
        new Action.SetResourceValue(Resource.Power, 1),
        new Action.SetBoolFlag(BoolFlag.PowerRegen),
        new Action.AddMessage('You hear a loud bang from the bottom of the ship'),
        new Action.AddMessage('Your fuel cells are on and recharging from your excess oxygen'),
        new Action.DisableButton(4)
      ]
    }

    toString () { return 'Mess with the control panel' }
  }
  Button.FiddleControls = FiddleControls
  class OpenDoor {
    constructor () {
      this.action = [
        new Action.AddMessage('You push the airlock open and immediately DIE.'),
        new Action.AddMessage('Just kidding - everything is fine.'),
        new Action.SetResourceValue(Resource.Chutzpah, 50),
        new Action.AddTile(1),
        new Action.DisableButton(5)
      ]
    }

    toString () { return 'Open Airlock' }
  }
  Button.OpenDoor = OpenDoor
})(Button || (Button = {}))
export function by_index (idx) {
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
