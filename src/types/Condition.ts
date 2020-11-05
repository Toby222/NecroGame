import { Game } from "src/components/Game";

import * as Buttons from "./Button";
import * as Actions from "./Action";
import * as Resources from "./Resource";

export abstract class Condition {
  abstract check(model: Game): boolean;
  abstract action: Actions.Action;
}

export class ResourceValue<T extends typeof Resources.BaseResource> extends Condition {
  resource: T;
  value: number;
  action = new Actions.EnableButton(Buttons.SummonSkeleton);

  constructor(resource: T, value: number) {
    super();
    this.resource = resource;
    this.value = value;
  }

  check(_game: Game): boolean {
    return this.resource.amount >= this.value;
  }
}
