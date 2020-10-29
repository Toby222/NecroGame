import { BaseButton } from "./Buttons";
import * as Flags from "./Flags";
import { BaseResource } from "./Resources";
import { Message } from "./Messages";

import { Game } from "../components/Game";
import { Condition } from "./Conditions";

export abstract class Action {
  abstract perform(model: Game): void;
}

export class PassTime extends Action {
  delay: number;
  constructor(delay: number) {
    super();
    this.delay = delay;
  }

  perform(model: Game) {
    for (let i = 0; i < this.delay; i++) {
      model.tick();
    }
  }
}

export class BulkAction extends Action {
  private actions: Action[];

  constructor(...actions: Action[]) {
    super();

    this.actions = actions;
  }

  perform(model: Game) {
    model.performActions(...this.actions);
  }
}

export class EnqueueAction extends Action {
  private delayedAction: DelayedAction;

  constructor(delayedAction: DelayedAction) {
    super();

    this.delayedAction = delayedAction;
  }

  perform(model: Game) {
    model.actionsQueue.push(this.delayedAction);
  }
}

export class DelayedAction extends Action {
  private action: Action;
  private delay: number;

  constructor(action: Action, delay: number) {
    super();

    this.delay = delay;
    this.action = action;
  }

  /**
   * @returns Wether or not the delayed Action was called
   */
  perform(model: Game) {
    if (--this.delay <= 0) {
      this.action.perform(model);
      return true;
    }
    return false;
  }
}

export class SetFlag extends Action {
  flag: Flags.AnyFlag;
  value: any;

  constructor(flag: Flags.AnyFlag, value: any) {
    super();

    this.value = value;
    this.flag = flag;
  }

  perform(model: Game) {
    model.flags.set(this.flag, this.value);
    this.flag.onSet(model, this.value);
  }
}

export class ClearFlag extends Action {
  private flag: Flags.AnyFlag;

  constructor(flag: Flags.AnyFlag) {
    super();

    this.flag = flag;
  }

  perform(model: Game) {
    model.flags.delete(this.flag);
    this.flag.onClear(model);
  }
}

export class SetResourceValue<T extends typeof BaseResource> extends Action {
  private amount: number;
  private resource: T;

  constructor(resource: T, amount: number) {
    super();
    this.amount = amount;
    this.resource = resource;
  }
  perform(model: Game) {
    this.resource.amount = this.amount;

    model.resources.push(this.resource);
  }
}

export class AddResourceValue<T extends typeof BaseResource> extends Action {
  // TODO add min/maxes, and check here
  private resource: T;
  private delta: number;

  constructor(resource: T, delta: number) {
    super();

    this.resource = resource;
    this.delta = delta;
  }

  perform(model: Game) {
    if (this.delta !== 0 && !model.resources.includes(this.resource)) {
      new SetResourceValue(this.resource, this.resource.amount).perform(model);
    }
    this.resource.amount += this.delta;
  }
}

export class AddResourceDelta<T extends typeof BaseResource> extends Action {
  private resource: T;
  private delta: number;

  constructor(resource: T, delta: number) {
    super();

    this.resource = resource;
    this.delta = delta;
  }

  perform(model: Game) {
    if (this.delta !== 0 && !model.resources.includes(this.resource)) {
      new SetResourceValue(this.resource, this.resource.amount).perform(model);
    }
    this.resource.delta += this.delta;
  }
}

export class AddMessage extends Action {
  private message: string;

  constructor(message: string) {
    super();

    this.message = message;
  }

  perform(model: Game) {
    model.messages.unshift(new Message(this.message, model.time));
  }
}

export class EnableButton<T extends typeof BaseButton> extends Action {
  private button: T;

  constructor(button: T) {
    super();

    this.button = button;
  }

  perform(model: Game) {
    if (!model.buttons.includes(this.button)) {
      model.buttons.push(this.button);
    }
    this.button.visible = true;
  }
}

export class DisableButton<T extends typeof BaseButton> extends Action {
  private button: T;

  constructor(button: T) {
    super();

    this.button = button;
  }

  perform(_game: Game) {
    this.button.visible = false;
  }
}

export class AddCondition extends Action {
  private condition: Condition;
  action: Action;

  constructor(condition: Condition, action: Action) {
    super();

    this.condition = condition;
    this.action = action;
  }

  perform(model: Game) {
    model.conditions.push(this.condition);
  }
}
