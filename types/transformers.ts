import { Resource } from './resource'
import { Model } from '../components/model'
import { Action } from './actions'

export interface Transformation {
  ApplyTransformation(model: Model): void
}

export class Transformation {
  static Generate = class Generate implements Transformation {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    ApplyTransformation (model: Model) {
      new Action.AddResourceValue(this.resource, this.delta).perform(model)
    }
  }

  static Consume = class Consume implements Transformation {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    ApplyTransformation (model: Model) {
      new Action.AddResourceValue(this.resource, -this.delta).perform(model)
    }
  }
}

// Each transformer should have a corresponding BoolFlag
export interface Transformer {
  effects: Transformation[]
  applyTransformers(model: Model): void
}

export class Transformer {
  static LeakyTank = class LeakyTank implements Transformer {
    effects = [
      new Transformation.Consume(Resource.Oxygen, 10)
    ]

    applyTransformers (model: Model) {
      for (const effect of this.effects) {
        effect.ApplyTransformation(model)
      }
    }
  }

  static PowerRegen = class PowerRegen implements Transformer {
    effects = [
      new Transformation.Generate(Resource.Power, 2),
      new Transformation.Consume(Resource.Oxygen, 1)
    ]

    applyTransformers (model: Model) {
      for (const effect of this.effects) {
        effect.ApplyTransformation(model)
      }
    }
  }
}

export function applyTransformers (model: Model) {
  for (const [flag] of model.boolFlags) {
    if (flag.transformer !== undefined) {
      flag.transformer.applyTransformers(model)
    }
  }
}
