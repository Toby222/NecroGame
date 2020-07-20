import { Resource } from './resource'
import { Action } from './actions'

import { Model } from '../components/model'

export interface Transformation {
  perform (model: Model): void
  apply (model: Model): void
  clear (model: Model): void
}

export class Transformation {
  static Generate = class Generate implements Transformation {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    perform (model: Model) {
      new Action.AddResourceValue(this.resource, this.delta).perform(model)
    }

    apply (model: Model) {
      new Action.AddResourceDelta(this.resource, this.delta).perform(model)
    }

    clear (model: Model) {
      new Action.AddResourceDelta(this.resource, -this.delta).perform(model)
    }
  }

  static Consume = class Consume implements Transformation {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = -delta
    }

    perform (model: Model) {
      new Action.AddResourceValue(this.resource, this.delta).perform(model)
    }

    apply (model: Model) {
      new Action.AddResourceDelta(this.resource, this.delta).perform(model)
    }

    clear (model: Model) {
      new Action.AddResourceDelta(this.resource, -this.delta).perform(model)
    }
  }
}
