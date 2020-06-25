import { TileID, defined_tiles } from 'tiles'
import { Button, ButtonID } from 'buttons'
import { BoolFlag } from 'flags'
import { Resource } from 'resource'
import { Model, Msg } from '../main'
import { Time } from 'time'
import { Transformation } from 'transformers'
import { Message } from 'messages'

export interface Action {
  perform(_: Model, ..._: any[]): void
}

export namespace Action {
  export class Noop implements Action {
    perform (model: Model) {}
  }
  export class AddMessage implements Action {
    private message: string
    constructor (message: string) {
      this.message = message
    }

    perform (model: Model) {
      model.messages.push(new Message(this.message, model.time))
    }
  }
  export class SetBoolFlag implements Action {
    private flag: BoolFlag
    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      model.bool_flags[this.flag] = true
      // apply delta
      if (this.flag.transformer === undefined) {
        return
      }
      for (const effect of this.flag.transformer.effects) {
        effect.apply_transformation(model)
      }
    }
  }
  export class ClearBoolFlag implements Action {
    private flag: BoolFlag
    constructor (flag: BoolFlag) {
      this.flag = flag
    }

    perform (model: Model) {
      model.bool_flags[this.flag] = false
      if (this.flag.transformer === undefined) {
        return
      }
      for (const effect of this.flag.transformer.effects) {
        effect.apply_transformation(model)
      }
    }
  }
  export class SetResourceValue implements Action {
    private resource: Resource
    private amount: number
    constructor (resource: Resource, amount: number) {
      this.resource = resource
      this.amount = amount
    }

    perform (model: Model) {
      model.resource_values[this.resource] = [this.amount, 0]
    }
  }
  export class AddResourceValue implements Action {
    private resource: Resource
    private delta: number
    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    perform (model: Model) {
      if (model.resource_values[this.resource] !== undefined) {
        model.resource_values[this.resource][0] += this.delta
      }
    }
  }
  export class AddResourceDelta implements Action {
    private resource: Resource
    private delta: number
    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    perform (model: Model) {
      if (model.resource_values[this.resource] !== undefined) {
        model.resource_values[this.resource][0] += this.delta
      }
    }
  }
  export class EnableButton implements Action {
    private bid: ButtonID
    constructor (bid :ButtonID) {
      this.bid = bid
    }

    perform (model: Model) {
      if (Button.by_index(this.bid) !== undefined) {
        model.buttons.push(this.bid)
      }
    }
  }
  export class DisableButton implements Action {
    private bid: ButtonID
    constructor (bid: ButtonID) {
      this.bid = bid
    }

    perform (model: Model) {
      if (Button.by_index(this.bid) !== undefined) {
        model.buttons = model.buttons.filter(button => {
          return button === this.bid
        })
      }
    }
  }
  export class AddTile implements Action {
    private tid: TileID
    constructor (tid: TileID) {
      this.tid = tid
    }

    perform (model: Model) {
      const new_tile = defined_tiles(this.tid)
      if (new_tile === undefined) {
        return
      }
      model.tiles.insert(new_tile)
      for (const button of new_tile.buttons) {
        model.buttons.push(button)
      }
    }
  }
}

export function msg_from_actions (actions: Action[]): Msg {
  if (actions.length === 0) {
    return Msg.PerformAction(new Action.Noop())
  } else if (actions.length === 1) {
    return Msg.PerformAction(actions[0])
  }

  const messages = []
  for (const action of actions) {
    messages.push(Msg.PerformAction(action))
  }
  Msg.Bulk(messages)
}

export class TimeAction {
  time: Time
  action: Action

  constructor (ticks: number, action: Action) {
    this.time = Time.from(ticks)
    this.action = action
  }
}

export function apply_timeactions (model: Model) {
  const timeactions = [
    new TimeAction(1, new Action.EnableButton(1)),
    new TimeAction(15, new Action.AddMessagge("It's been 15 SECONDS"))
  ]

  for (const time_action of timeactions) {
    if (time_action === model.time) {
      time_action.action.perform(model)
    }
  }
}
