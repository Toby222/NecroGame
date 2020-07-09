import { Resource } from './resource'
import { Transformation } from './transformations'

import { Model } from '../components/model'

export interface Transformer {
  transformations: Transformation[]
  apply (model: Model): void
}

export interface BoolFlag {
  transformer?: Transformer
}

export class BoolFlag {
  static OxygenMonitor = new class OxygenMonitor implements BoolFlag {
    transformer = undefined
  }()

  static LeakyTank = new class LeakyTank implements BoolFlag {
    transformer = new class LeakyTank implements Transformer {
      transformations = [
        new Transformation.Consume(Resource.Oxygen, 10)
      ]

      apply (_model: Model) { }
    }()
  }()

  static PowerRegen = new class PowerRegen implements BoolFlag {
    transformer = new class PowerRegen implements Transformer {
      transformations = [
        new Transformation.Generate(Resource.Power, 2),
        new Transformation.Consume(Resource.Oxygen, 1)
      ]

      apply (_model: Model) { }
    }()
  }()

  static TimeFreeze = new class TimeFreeze implements BoolFlag {
    transformer = new class TimeFreeze implements Transformer {
      transformations = [
        new Transformation.Consume(Resource.Power, 1)
      ]

      apply (model: Model) {
        model.time.seconds--
      }
    }()
  }()
}
