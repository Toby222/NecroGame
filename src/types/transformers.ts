import { Resource } from 'resource'
import { Model } from '../main'

export interface Transformer {
  effects: Transformation[]
  apply_tranformer(): void
}

export namespace Transformer {
  export class LeakyTank implements Transformer {
    effects = [
      Consume(Resource.Oxygen, 10)
    ]

    private apply_transformer (model: Model) {
      for (const effect of this.effects) {
        effect.apply_transformation()
      }
    }
  }

  export class PowerRegen implements Transformer {
    effects = [
      Generate(Resource.Power, 2),
      Consume(Resource.Oxygen, 1)
    ]

    private apply_transformer (model: Model) {
      for (const effect of this.effects) {
        effect.apply_transformation()
      }
    }
  }
}

export interface Transformation {
  apply_transformation(model: Model): void
}

export namespace Transformation {
  export class Generate {
    constructor (resource: Resource, delta: number) {

    }
  }
}
