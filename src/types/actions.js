import { defined_tiles } from 'tiles'
import { Button } from 'buttons'
import { Msg } from '../main'
import { Time } from 'time'
import { Message } from 'messages'
export var Action;
(function (Action) {
  class Noop {
    perform (model) { }
  }
  Action.Noop = Noop
  class AddMessage {
    constructor (message) {
      this.message = message
    }

    perform (model) {
      model.messages.push(new Message(this.message, model.time))
    }
  }
  Action.AddMessage = AddMessage
  class SetBoolFlag {
    constructor (flag) {
      this.flag = flag
    }

    perform (model) {
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
  Action.SetBoolFlag = SetBoolFlag
  class ClearBoolFlag {
    constructor (flag) {
      this.flag = flag
    }

    perform (model) {
      model.bool_flags[this.flag] = false
      if (this.flag.transformer === undefined) {
        return
      }
      for (const effect of this.flag.transformer.effects) {
        effect.apply_transformation(model)
      }
    }
  }
  Action.ClearBoolFlag = ClearBoolFlag
  class SetResourceValue {
    constructor (resource, amount) {
      this.resource = resource
      this.amount = amount
    }

    perform (model) {
      model.resource_values[this.resource] = [this.amount, 0]
    }
  }
  Action.SetResourceValue = SetResourceValue
  class AddResourceValue {
    constructor (resource, delta) {
      this.resource = resource
      this.delta = delta
    }

    perform (model) {
      if (model.resource_values[this.resource] !== undefined) {
        model.resource_values[this.resource][0] += this.delta
      }
    }
  }
  Action.AddResourceValue = AddResourceValue
  class AddResourceDelta {
    constructor (resource, delta) {
      this.resource = resource
      this.delta = delta
    }

    perform (model) {
      if (model.resource_values[this.resource] !== undefined) {
        model.resource_values[this.resource][0] += this.delta
      }
    }
  }
  Action.AddResourceDelta = AddResourceDelta
  class EnableButton {
    constructor (bid) {
      this.bid = bid
    }

    perform (model) {
      if (Button.by_index(this.bid) !== undefined) {
        model.buttons.push(this.bid)
      }
    }
  }
  Action.EnableButton = EnableButton
  class DisableButton {
    constructor (bid) {
      this.bid = bid
    }

    perform (model) {
      if (Button.by_index(this.bid) !== undefined) {
        model.buttons = model.buttons.filter(button => {
          return button === this.bid
        })
      }
    }
  }
  Action.DisableButton = DisableButton
  class AddTile {
    constructor (tid) {
      this.tid = tid
    }

    perform (model) {
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
  Action.AddTile = AddTile
})(Action || (Action = {}))
export function msg_from_actions (actions) {
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
  constructor (ticks, action) {
    this.time = Time.from(ticks)
    this.action = action
  }
}
export function apply_timeactions (model) {
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
