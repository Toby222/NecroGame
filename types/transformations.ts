import * as Resources from './resource'
import * as Actions from './actions'

import { Model } from '../components/model'

export abstract class Transformation {
  abstract perform (model: Model): void
  abstract apply (model: Model): void
  abstract clear (model: Model): void
}

export const Generate = class Generate extends Transformation {
    private resource: Resources.Resource
    private delta: number

    constructor (resource: Resources.Resource, delta: number) {
      super()

      this.resource = resource
      this.delta = delta
    }

    perform (model: Model) {
      new Actions.AddResourceValue(this.resource, this.delta).perform(model)
    }

    apply (model: Model) {
      new Actions.AddResourceDelta(this.resource, this.delta).perform(model)
    }

    clear (model: Model) {
      new Actions.AddResourceDelta(this.resource, -this.delta).perform(model)
    }
}

export const Consume = class Consume extends Transformation {
    private resource: Resources.Resource
    private delta: number

    constructor (resource: Resources.Resource, delta: number) {
      super()

      this.resource = resource
      this.delta = -delta
    }

    perform (model: Model) {
      new Actions.AddResourceValue(this.resource, this.delta).perform(model)
    }

    apply (model: Model) {
      new Actions.AddResourceDelta(this.resource, this.delta).perform(model)
    }

    clear (model: Model) {
      new Actions.AddResourceDelta(this.resource, -this.delta).perform(model)
    }
}
