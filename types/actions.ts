import { Model, Msg } from '../pages/impact'
import { TileID, definedTiles } from './tiles'
import { Button, ButtonID } from './buttons'
import { BoolFlag } from './flags'
import { Resource } from './resource'
import { Time } from './time'
import { Message } from './messages'

export interface Action {
  perform(model: Model, ...params: any[]): void
}

export class Action {
  static Noop = class Noop implements Action {
    perform (model: Model) {}
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
      }
    }
  }

  static ClearBoolFlag = class ClearBoolFlag implements Action {
    private flag: BoolFlag
    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      model.boolFlags.set(this.flag, false)
      if (this.flag.transformer === undefined) {
        return
      }
      for (const effect of this.flag.transformer.effects) {
        effect.ApplyTransformation(model)
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
      model.resourceValues.set(this.resource, [this.amount, 0])
    }
  }

  static AddResourceValue = class AddResourceValue implements Action {
    private resource: Resource
    private delta: number
    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    perform (model: Model) {
      const val = model.resourceValues.get(this.resource)
      if (val !== undefined) {
        val[0] += this.delta
      }
    }
  }

  static AddResourceDelta = class AddResourceDelta implements Action {
    private resource: Resource
    private delta: number
    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    perform (model: Model) {
      const val = model.resourceValues.get(this.resource)
      if (val !== undefined) {
        val[1] += this.delta
      }
    }
  }

  static AddMessage = class AddMessage implements Action {
    private message: string
    constructor (message: string) {
      this.message = message
    }

    perform (model: Model) {
      model.messages.push(new Message(this.message, model.time))
    }
  }

  static EnableButton = class EnableButton implements Action {
    private bid: ButtonID
    constructor (bid :ButtonID) {
      this.bid = bid
    }

    perform (model: Model) {
      if (Button.byIndex(this.bid) !== undefined) {
        model.buttons.push(this.bid)
      }
    }
  }

  static DisableButton = class DisableButton implements Action {
    private bid: ButtonID
    constructor (bid: ButtonID) {
      this.bid = bid
    }

    perform (model: Model) {
      if (Button.byIndex(this.bid) !== undefined) {
        model.buttons = model.buttons.filter((button: ButtonID) => {
          return button !== this.bid
        })
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
  time: Time
  action: Action

  constructor (ticks: number, action: Action) {
    this.time = new Time(ticks)
    this.action = action
  }
}

const timeactions = [
  new TimeAction(1, new Action.EnableButton(1)),
  new TimeAction(15, new Action.AddMessage("It's been 15 SECONDS"))
]

export function applyTimeactions (model: Model) {
  for (const timeAction of timeactions) {
    if (timeAction.time.seconds === model.time.seconds) {
      timeAction.action.perform(model)
    }
  }
}
