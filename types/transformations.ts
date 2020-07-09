import { Resource } from './resource'
import { Action } from './actions'

import { Model } from '../components/model'

export interface Transformation {
  apply (model: Model, inverse?: boolean): void
  applyDelta (model: Model, inverse?: boolean): void
}

export class Transformation {
  static Generate = class Generate implements Transformation {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    apply (model: Model, inverse: boolean = false) {
      const delta = inverse ? -this.delta : this.delta
      new Action.AddResourceValue(this.resource, delta).perform(model)
    }

    applyDelta (model: Model, inverse: boolean = false) {
      const delta = inverse ? -this.delta : this.delta
      new Action.AddResourceDelta(this.resource, delta).perform(model)
    }
  }

  static Consume = class Consume implements Transformation {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    apply (model: Model, inverse: boolean = false) {
      const delta = inverse ? this.delta : -this.delta
      new Action.AddResourceValue(this.resource, delta).perform(model)
    }

    applyDelta (model: Model, inverse: boolean = false) {
      const delta = inverse ? this.delta : -this.delta
      new Action.AddResourceDelta(this.resource, delta).perform(model)
    }
  }
}
