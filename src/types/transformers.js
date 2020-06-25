import { Resource } from 'resource'
import { Action } from 'action'
export var Transformation;
(function (Transformation) {
  class Generate {
    constructor (resource, delta) {
      this.resource = resource
      this.delta = delta
    }

    apply_transformation (model) {
      new Action.AddResourceValue(this.resource, this.delta).perform(model)
    }
  }
  Transformation.Generate = Generate
  class Consume {
    constructor (resource, delta) {
      this.resource = resource
      this.delta = delta
    }

    apply_transformation (model) {
      new Action.AddResourceValue(this.resource, -this.delta).perform(model)
    }
  }
  Transformation.Consume = Consume
})(Transformation || (Transformation = {}))
export var Transformer;
(function (Transformer) {
  class LeakyTank {
    constructor () {
      this.effects = [
        new Transformation.Consume(Resource.Oxygen, 10)
      ]
    }

    apply_transformer (model) {
      for (const effect of this.effects) {
        effect.apply_transformation(model)
      }
    }
  }
  Transformer.LeakyTank = LeakyTank
  class PowerRegen {
    constructor () {
      this.effects = [
        new Transformation.Generate(Resource.Power, 2),
        new Transformation.Consume(Resource.Oxygen, 1)
      ]
    }

    apply_transformer (model) {
      for (const effect of this.effects) {
        effect.apply_transformation(model)
      }
    }
  }
  Transformer.PowerRegen = PowerRegen
})(Transformer || (Transformer = {}))
export function apply_transformers (model) {
  for (const flag in model.bool_flags) {
    if (model.bool_flags[flag] && flag.transformer !== undefined) {
      flag.transformer.apply_transformer()
    }
  }
}
