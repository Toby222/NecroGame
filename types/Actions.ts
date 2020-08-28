import { BaseButton } from "./Buttons";
import * as Flags from "./Flags";
import { BaseResource, Dirt } from "./Resources";
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
        if (Flags.TransformationFlag.is(flag) && Boolean(value)) {
          flag.performEffects(model);
        }
      }
    }
  }
}

export class SetFlag extends Action {
  private flag: Flags.StaticFlag;
  private value: any;

  constructor(flag: Flags.StaticFlag, value: any) {
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
  private flag: Flags.StaticFlag;

  constructor(flag: Flags.StaticFlag) {
    super();

    this.flag = flag;
  }

  perform(model: Model) {
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
  perform(model: Model) {
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

  perform(model: Model) {
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

  perform(model: Model) {
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

  perform(model: Model) {
    model.messages.unshift(new Message(this.message, model.time));
  }
}

export class EnableButton<T extends typeof BaseButton> extends Action {
  private button: T;

  constructor(button: T) {
    super();

    this.button = button;
  }

  perform(model: Model) {
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

  perform(model: Model) {
    this.button.visible = false;
  }
}
