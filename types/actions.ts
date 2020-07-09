import { definedTiles } from './tiles'
import { Button } from './buttons'
import { BoolFlag } from './flags'
import { Resource } from './resource'
import { Message } from './messages'

import { Model, Msg } from '../components/model'

export interface Action {
  timeCost: number
  perform(model: Model): void
}
export class Action {
  static Wait = class Wait implements Action {
    timeCost: number;

    /**
    * @param {number} time - The duration of time to wait for.
    */
    constructor (time: number) {
      this.timeCost = time
    }

    perform (_model: Model) { }
  }

  static SetBoolFlag = class SetBoolFlag implements Action {
    private flag: BoolFlag

    timeCost = 0;

    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      model.boolFlags.set(this.flag, true)
      // apply delta
      if (this.flag.transformer !== undefined) {
        for (const effect of this.flag.transformer.transformations) {
          effect.apply(model)
          effect.applyDelta(model)
        }
      }
    }
  }

  static ClearBoolFlag = class ClearBoolFlag implements Action {
    private flag: BoolFlag

    timeCost = 0;

    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      if (model.boolFlags.get(this.flag) === false) {
        throw new Error('Disabled flags cannot be disabled again.')
      }
      model.boolFlags.delete(this.flag)
      if (this.flag.transformer !== undefined) {
        for (const effect of this.flag.transformer.transformations) {
          effect.apply(model, true)
          effect.applyDelta(model, true)
        }
      }
    }
  }

  static SetResourceValue = class SetResourceValue implements Action {
    private resource: Resource
    private amount: number

    timeCost = 0;

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

    timeCost = 0;

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

    timeCost = 0;

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

    timeCost = 0;

    constructor (message: string) {
      this.message = message
    }

    perform (model: Model) {
      model.messages.unshift(new Message(this.message, model.time))
    }
  }

  static EnableButton = class EnableButton implements Action {
    private button: Button

    timeCost = 0;

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

    timeCost = 0;

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

    timeCost = 0;

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
}

export function msgFromActions (actions: Action[]): Msg {
  if (actions.length === 0) {
    return new Msg.PerformAction(new Action.Wait(1))
  } else if (actions.length === 1) {
    return new Msg.PerformAction(actions[0])
  }

  return new Msg.Bulk(actions.map(action => new Msg.PerformAction(action)))
}
