import { definedTiles } from './tiles'
import { Button } from './buttons'
import { BoolFlag } from './flags'
import { Resource } from './resource'
import { Message } from './messages'

import { Model } from '../components/model'

export interface Action {
  timeCost: number
  perform(model: Model): void
}

export class Action {
  static Wait = class Wait implements Action {
    timeCost: number
    constructor (time: number) {
      this.timeCost = time
    }

    perform (_model: Model) { }
  }

  static SetBoolFlag = class SetBoolFlag implements Action {
    private flag: BoolFlag

    timeCost = 0
    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      if (model.boolFlags.get(this.flag) === true) {
        throw new Error('Enabled flags cannot be enabled again.')
      }
      model.boolFlags.set(this.flag, true)
      this.flag.set(model)
    }
  }

  static ClearBoolFlag = class ClearBoolFlag implements Action {
    private flag: BoolFlag

    timeCost = 0
    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      if (model.boolFlags.get(this.flag) === false) {
        throw new Error('Disabled flags cannot be disabled again.')
      }
      this.flag.clear(model)
    }
  }

  static SetResourceValue = class SetResourceValue implements Action {
    private resource: Resource
    private amount: number

    timeCost = 0

    constructor (resource: Resource, amount: number) {
      this.resource = resource
      this.amount = amount
    }

    perform (model: Model) {
      if (model.resourceValues.includes(this.resource)) {
        throw new Error('Resource may only be set once')
      }
      this.resource.amount = this.amount
      this.resource.delta = 0

      model.resourceValues.push(this.resource)
    }
  }

  static AddResourceValue = class AddResourceValue implements Action {
    // TODO add min/maxes, and check here
    private resource: Resource
    private delta: number

    timeCost = 0

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    perform (_model: Model) {
      this.resource.amount += this.delta
    }
  }

  static AddResourceDelta = class AddResourceDelta implements Action {
    private resource: Resource
    private delta: number

    timeCost = 0

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    perform (_model: Model) {
      this.resource.delta += this.delta
    }
  }

  static AddMessage = class AddMessage implements Action {
    private message: string

    timeCost = 0

    constructor (message: string) {
      this.message = message
    }

    perform (model: Model) {
      model.messages.unshift(new Message(this.message, model.time))
    }
  }

  static EnableButton = class EnableButton implements Action {
    private button: Button

    timeCost = 0

    constructor (button: Button) {
      this.button = button
    }

    perform (model: Model) {
      if (this.button === undefined) {
        throw new Error('Invalid id for EnableButton action')
      }
      model.buttons.push(this.button)
    }
  }

  static DisableButton = class DisableButton implements Action {
    private button: Button

    timeCost = 0

    constructor (button: Button) {
      this.button = button
    }

    perform (model: Model) {
      const toDelete = model.buttons.indexOf(this.button)
      if (toDelete >= 0) {
        model.buttons.splice(toDelete, 1)
      }
    }
  }

  static AddTile = class AddTile implements Action {
    private tid: number

    timeCost = 0

    constructor (tid: number) {
      this.tid = tid
    }

    perform (model: Model) {
      const newTile = definedTiles(this.tid)
      if (newTile === undefined) {
        return
      }
      model.tiles.set(this.tid, newTile)
      for (const button of newTile.buttons) {
        model.buttons.push(button)
      }
    }
  }

  static LogAction = class LogAction implements Action {
    private action: string
    private end: boolean

    static active: string[] = []

    timeCost = 0

    constructor (end: boolean, action: string) {
      this.end = end
      this.action = action
    }

    perform (_model: Model) {
      if (process.env.NODE_ENV !== 'production') {
        return
      }
      if (!this.end && LogAction.active.includes(this.action)) {
        throw new Error('Tried to start already started log transaction')
      }
      if (this.end && !LogAction.active.includes(this.action)) {
        throw new Error('Tried to end log transaction that hasn\'t been started')
      }
      if (this.end) {
        window.strum('endTransaction', this.action)
        LogAction.active.splice(LogAction.active.indexOf(this.action), 1)
      } else {
        window.strum('startTransaction', this.action)
        LogAction.active.push(this.action)
      }
    }
  }
}
