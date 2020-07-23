import * as Resources from './resource'
import * as Transformations from './transformations'

import { Model } from '../components/model'

export abstract class BoolFlag {
  protected abstract transformations: Transformations.Transformation[]
  set (model: Model) {
    for (const transformation of this.transformations) {
      transformation.apply(model)
    }
  }

  clear (model: Model) {
    for (const transformation of this.transformations) {
      transformation.clear(model)
    }
    model.boolFlags.set(this, false)
  }

  performEffects (model: Model) {
    for (const transformation of this.transformations) {
      transformation.perform(model)
    }
  }
}

export const LeakyTank = new class LeakyTank extends BoolFlag {
  protected transformations = [
    new Transformations.Consume(Resources.Oxygen, 10)
  ]
}()

export const PowerRegen = new class PowerRegen extends BoolFlag {
  protected transformations = [
    new Transformations.Generate(Resources.Power, 2),
    new Transformations.Consume(Resources.Oxygen, 1)
  ]
}()
