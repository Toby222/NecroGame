import { Transformer } from 'transformers'
export var BoolFlag;
(function (BoolFlag) {
  BoolFlag.OxygenMonitor = new class OxygenMonitor {
    constructor () {
      this.transformer = undefined
    }
  }()
  BoolFlag.LeakyTank = new class LeakyTank {
    constructor () {
      this.transformer = new Transformer.LeakyTank()
    }
  }()
  BoolFlag.PowerRegen = new class PowerRegen {
    constructor () {
      this.transformer = new Transformer.PowerRegen()
    }
  }()
})(BoolFlag || (BoolFlag = {}))
