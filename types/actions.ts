import { Model, Msg } from '../components/model'
import { TileID, definedTiles } from './tiles'
import { Button } from './buttons'
import { BoolFlag } from './flags'
import { Resource } from './resource'
import { Message } from './messages'

export interface Action {
  perform(model: Model): void
}

export class Action {
  static Noop = class Noop implements Action {
    perform (_model: Model) {}
  }

  static SetBoolFlag = class SetBoolFlag implements Action {
    private flag: BoolFlag
    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      model.boolFlags.set(this.flag, true)
      // apply delta
      if (this.flag.transformer === undefined) {
        return
      }
      for (const effect of this.flag.transformer.effects) {
        effect.ApplyTransformation(model)
        effect.ApplyDeltaTransformation(model)
      }
    }
  }

  static ClearBoolFlag = class ClearBoolFlag implements Action {
    // remove delta
    // TODO: POTENTIAL BUG
    // you should check if it's already false or not
    private flag: BoolFlag
    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      model.boolFlags.set(this.flag, false)
      if (this.flag.transformer !== undefined) {
        for (const effect of this.flag.transformer.effects) {
          effect.ApplyDeltaTransformation(model)
          effect.ApplyTransformation(model)
        }
      }
    }
  }

  static SetResourceValue = class SetResourceValue implements Action {
    private resource: Resource
    private amount: number
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
    constructor (message: string) {
      this.message = message
    }

    perform (model: Model) {
      model.messages.unshift(new Message(this.message, model.time))
    }
  }

  static EnableButton = class EnableButton implements Action {
    private buttonId: number
    constructor (buttonId: number) {
      this.buttonId = buttonId
    }

    perform (model: Model) {
      const button = Button.byId(this.buttonId)
      if (button === undefined) { throw new Error('Invalid id for EnableButton action') }
      model.buttons.push(button)
    }
  }

  static DisableButton = class DisableButton implements Action {
    private button: Button
    constructor (button: Button) {
      this.button = button
    }

    perform (model: Model) {
      /* eslint-disable-next-line eqeqeq */
      const toDelete = model.buttons.findIndex((btn) => btn == this.button)
      if (toDelete >= 0) {
        model.buttons.splice(toDelete, 1)
      }
    }
  }

  static AddTile = class AddTile implements Action {
    private tid: TileID
    constructor (tid: TileID) {
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
    return new Msg.PerformAction(new Action.Noop())
  } else if (actions.length === 1) {
    return new Msg.PerformAction(actions[0])
  }

  const messages = []
  for (const action of actions) {
    messages.push(new Msg.PerformAction(action))
  }
  return new Msg.Bulk(messages)
}

export class TimeAction {
  time: number
  action: Action

  constructor (ticks: number, action: Action) {
    this.time = ticks
    this.action = action
  }
}

const timeactions = [
  new TimeAction(1, new Action.EnableButton(1)),
  new TimeAction(15, new Action.AddMessage("It's been 15 SECONDS"))
]

export function applyTimeactions (model: Model) {
  for (const timeaction of timeactions) {
    if (timeaction.time <= model.time.seconds) {
      timeaction.action.perform(model)
      timeactions.splice(timeactions.indexOf(timeaction), 1)
    }
  }
}
