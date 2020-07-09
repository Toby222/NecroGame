import { Action } from './actions'
import { BoolFlag } from './flags'
import { Resource } from './resource'

export interface Button {
  id: number
  actions: Action[]
}
export class Button {
  static buttons: Button[] = []

  static Wait = new class Wait implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Wait 1 Second' }

    get actions () {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.Noop()
        ]
      }
      return this.actionsCache
    }
  }()

  static ActivateOxygen = new class ActivateOxygen implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Activate Oxygen' }

    get actions (): Action[] {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.SetBoolFlag(BoolFlag.OxygenMonitor),
          new Action.SetResourceValue(Resource.Oxygen, 1000),
          new Action.SetBoolFlag(BoolFlag.LeakyTank),
          new Action.AddMessage('Oxygen Monitor Up'),
          new Action.AddMessage('Losing 10 Oxygen per second - tank leaky'),
          new Action.EnableButton(Button.OpenToolbox),
          new Action.EnableButton(Button.OpenDoor),
          new Action.DisableButton(this)
        ]
      }
      return this.actionsCache
    }
  }()

  static OpenToolbox = new class OpenToolbox implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Search Toolbox' }

    get actions (): Action[] {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.AddMessage('You unceremoniously dump the toolbox contents all over the ship'),
          new Action.EnableButton(Button.ApplyTape),
          new Action.EnableButton(Button.FiddleControls),
          new Action.DisableButton(this)
        ]
      }
      return this.actionsCache
    }
  }()

  static ApplyTape = new class ApplyTape implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Apply Scotch Tape to Tank' }

    get actions (): Action[] {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.ClearBoolFlag(BoolFlag.LeakyTank),
          new Action.AddMessage('Leak stopped - for now.'),
          new Action.DisableButton(this)
        ]
      }
      return this.actionsCache
    }
  }()

  static FiddleControls = new class FiddleControls implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Mess with the control panel' }

    get actions (): Action[] {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.SetResourceValue(Resource.Power, 1),
          new Action.SetBoolFlag(BoolFlag.PowerRegen),
          new Action.AddMessage('You hear a loud bang from the bottom of the ship'),
          new Action.AddMessage('Your fuel cells are on and recharging from your excess oxygen'),
          new Action.EnableButton(Button.FreezeTime),
          new Action.DisableButton(this)
        ]
      }
      return this.actionsCache
    }
  }()

  static OpenDoor = new class OpenDoor implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Open Airlock' }

    get actions (): Action[] {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.AddMessage('You push the airlock open and immediately DIE.'),
          new Action.AddMessage('Just kidding - everything is fine.'),
          new Action.SetResourceValue(Resource.Chutzpah, 50),
          new Action.AddTile(1),
          new Action.DisableButton(this)
        ]
      }
      return this.actionsCache
    }
  }()

  static FreezeTime = new class FreezeTime implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Enable TimeFreeze' }

    get actions (): Action[] {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.AddMessage('The Time Freezer starts humming.'),
          new Action.SetBoolFlag(BoolFlag.TimeFreeze),
          new Action.EnableButton(Button.UnfreezeTime),
          new Action.DisableButton(this)
        ]
      }
      return this.actionsCache
    }
  }()

  static UnfreezeTime = new class UnfreezeTime implements Button {
    id: number
    private actionsCache?: Action[]

    constructor () {
      this.id = Button.buttons.length
      Button.buttons.push(this)
    }

    toString () { return 'Disable TimeFreeze' }

    get actions (): Action[] {
      if (this.actionsCache === undefined) {
        this.actionsCache = [
          new Action.AddMessage('The Time Freezer goes quiet'),
          new Action.ClearBoolFlag(BoolFlag.TimeFreeze),
          new Action.EnableButton(Button.FreezeTime),
          new Action.DisableButton(this)
        ]
      }
      return this.actionsCache
    }
  }()
}
