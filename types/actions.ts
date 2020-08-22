import { Button } from "./Buttons";
import * as Flags from "./Flags";
import { Resource } from "./Resource";
import { Message } from "./Messages";

import { Model } from "../components/Model";

export abstract class Action {
  abstract perform(model: Model): void;
}

export class PassTime extends Action {
  delay: number;
  constructor(delay: number) {
    super();
    this.delay = delay;
  }

  perform(model: Model) {
    for (let i = 0; i < this.delay; i++) {
      model.time.seconds++;
      for (const [flag, value] of model.flags) {
        if (flag instanceof Flags.BoolFlag && value === true) {
          flag.performEffects(model);
        }
      }
    }
  }
}

export class SetFlag<T> extends Action {
  private flag: Flags.Flag<T>;
  private value: T;

  constructor(flag: Flags.Flag<T>, value: T) {
    super();

    this.value = value;
    this.flag = flag;
  }

  perform(model: Model) {
    model.flags.set(this.flag, this.value);
    this.flag.onSet(model, this.value);
  }
}

export class ClearFlag extends Action {
  private flag: Flags.Flag;

  constructor(flag: Flags.Flag) {
    super();

    this.flag = flag;
  }

  perform(model: Model) {
    model.flags.delete(this.flag);
    this.flag.onClear(model);
  }
}

export class SetResourceValue extends Action {
  private resource: Resource;
  private amount: number;

  constructor(resource: Resource, amount: number) {
    super();

    this.resource = resource;
    this.amount = amount;
  }

  perform(model: Model) {
    if (model.resources.includes(this.resource)) {
      throw new Error("Resource may only be set once");
    }
    this.resource.amount = this.amount;
    this.resource.delta = 0;

    model.resources.push(this.resource);
  }
}

export class AddResourceValue extends Action {
  // TODO add min/maxes, and check here
  private resource: Resource;
  private delta: number;

  constructor(resource: Resource, delta: number) {
    super();

    this.resource = resource;
    this.delta = delta;
  }

  perform(_model: Model) {
    this.resource.amount += this.delta;
  }
}

export class AddResourceDelta extends Action {
  private resource: Resource;
  private delta: number;

  constructor(resource: Resource, delta: number) {
    super();

    this.resource = resource;
    this.delta = delta;
  }

  perform(_model: Model) {
    this.resource.delta += this.delta;
  }
}

export class AddMessage extends Action {
  private message: string;

  constructor(message: string) {
    super();

    this.message = message;
  }

  perform(model: Model) {
    model.messages.unshift(new Message(this.message, model.time));
  }
}

export class EnableButton extends Action {
  private button: Button;

  constructor(button: Button) {
    super();

    this.button = button;
  }

  perform(model: Model) {
    if (this.button === undefined) {
      throw new Error("Invalid id for EnableButton action");
    }
    model.buttons.push(this.button);
  }
}

export class DisableButton extends Action {
  private button: Button;

  constructor(button: Button) {
    super();

    this.button = button;
  }

  perform(model: Model) {
    const toDelete = model.buttons.indexOf(this.button);
    if (toDelete >= 0) {
      model.buttons.splice(toDelete, 1);
    }
  }
}
