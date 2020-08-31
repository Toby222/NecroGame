import { Model } from "../components/Model";

import * as Buttons from "./Buttons";
import * as Actions from "./Actions";
import * as Resources from "./Resources";

export abstract class Condition {
  abstract check(model: Model): boolean;
  abstract action: Actions.Action;
}

export class ResourceValue<
  T extends typeof Resources.BaseResource
> extends Condition {
  resource: T;
  value: number;
  action = new Actions.EnableButton(Buttons.SummonSkeleton);

  constructor(resource: T, value: number) {
    super();
    this.resource = resource;
    this.value = value;
  }

  check(model: Model): boolean {
    return this.resource.amount === this.value;
  }
}
