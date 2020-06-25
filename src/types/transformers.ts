import { Resource } from 'resource'
import { Model } from '../main'
import { Action } from 'action'

export interface Transformation {
  resource: Resource
  delta: number

  apply_transformation(model: Model): void
}

export namespace Transformation {
  export class Generate {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    apply_transformation (model: Model) {
      new Action.AddResourceValue(this.resource, this.delta).perform(model)
    }
  }

  export class Consume {
    private resource: Resource
    private delta: number

    constructor (resource: Resource, delta: number) {
      this.resource = resource
      this.delta = delta
    }

    apply_transformation (model: Model) {
      new Action.AddResourceValue(this.resource, -this.delta).perform(model)
    }
  }
}

// Each transformer should have a corresponding BoolFlag
export interface Transformer {
  effects: Transformation[]
  apply_tranformer(): void
}

export namespace Transformer {
  export class LeakyTank implements Transformer {
    effects = [
      new Transformation.Consume(Resource.Oxygen, 10)
    ]

    private apply_transformer (model: Model) {
      for (const effect of this.effects) {
        effect.apply_transformation(model)
      }
    }
  }

  export class PowerRegen implements Transformer {
    effects = [
      new Transformation.Generate(Resource.Power, 2),
      new Transformation.Consume(Resource.Oxygen, 1)
    ]

    private apply_transformer (model: Model) {
      for (const effect of this.effects) {
        effect.apply_transformation(model)
      }
    }
  }
}

export function apply_transformers (model: Model) {
  for (const flag in model.bool_flags) {
    if (model.bool_flags[flag] && flag.transformer !== undefined) {
      flag.transformer.apply_transformer()
    }
  }
}
