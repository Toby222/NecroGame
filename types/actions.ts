import { Button } from "./buttons";
import { BoolFlag } from "./flags";
import { Resource } from "./resource";
import { Message } from "./messages";

import { Model } from "../components/model";

export abstract class Action {
  abstract timeCost: number;
  abstract perform(model: Model): void;
}

export class Wait extends Action {
  timeCost: number;
  constructor(time: number) {
    super();

    this.timeCost = time;
  }

  perform(_model: Model) {}
}

export class SetBoolFlag extends Action {
  private flag: BoolFlag;

  timeCost = 0;
  constructor(flag: BoolFlag) {
    super();

    this.flag = flag;
  }

  perform(model: Model) {
    if (model.boolFlags.get(this.flag) === true) {
      throw new Error("Enabled flags cannot be enabled again.");
    }
    model.boolFlags.set(this.flag, true);
    this.flag.set(model);
  }
}

export class ClearBoolFlag extends Action {
  private flag: BoolFlag;

  timeCost = 0;
  constructor(flag: BoolFlag) {
    super();

    this.flag = flag;
  }

  perform(model: Model) {
    if (model.boolFlags.get(this.flag) === false) {
      throw new Error("Disabled flags cannot be disabled again.");
    }
    this.flag.clear(model);
  }
}

export class SetResourceValue extends Action {
  private resource: Resource;
  private amount: number;

  timeCost = 0;

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

  timeCost = 0;

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

  timeCost = 0;

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

  timeCost = 0;

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

  timeCost = 0;

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

  timeCost = 0;

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
