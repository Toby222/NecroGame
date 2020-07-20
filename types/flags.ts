import { Resource } from './resource'
import { Transformation } from './transformations'

import { Model } from '../components/model'

export interface BoolFlag {
  set (model: Model): void
  clear (model: Model): void
  performEffects(model: Model): void
}

export class BoolFlag {
  static OxygenMonitor = new class OxygenMonitor implements BoolFlag {
    set (_model: Model) { }
    clear (_model: Model) {}
    performEffects (_model: Model) { }
  }()

  static LeakyTank = new class LeakyTank implements BoolFlag {
    private transformations = [
      new Transformation.Consume(Resource.Oxygen, 10)
    ]

    set (model: Model) {
      for (const transformation of this.transformations) {
        transformation.apply(model)
      }
    }

    clear (model: Model) {
      for (const transformation of this.transformations) {
        transformation.clear(model)
      }
    }

    performEffects (model: Model) {
      for (const transformation of this.transformations) {
        transformation.perform(model)
      }
    }
  }()

  static PowerRegen = new class PowerRegen implements BoolFlag {
    private transformations = [
      new Transformation.Generate(Resource.Power, 2),
      new Transformation.Consume(Resource.Oxygen, 1)
    ]

    set (model: Model) {
      for (const transformation of this.transformations) {
        transformation.apply(model)
      }
    }

    clear (model: Model) {
      for (const transformation of this.transformations) {
        transformation.clear(model)
      }
    }

    performEffects (model: Model) {
      for (const transformation of this.transformations) {
        transformation.perform(model)
      }
    }
  }()

  static TimeFreeze = new class TimeFreeze implements BoolFlag {
    private transformations = [
      new Transformation.Consume(Resource.Power, 1)
    ]

    set (model: Model) {
      for (const transformation of this.transformations) {
        transformation.apply(model)
      }
    }

    clear (model: Model) {
      model.boolFlags.set(this, false)
      for (const transformation of this.transformations) {
        transformation.clear(model)
      }
    }

    performEffects (model: Model) {
      model.time.seconds--
      for (const transformation of this.transformations) {
        transformation.perform(model)
      }
    }
  }()
}
