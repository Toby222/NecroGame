import { Transformer } from './transformers'

export interface BoolFlag {
  transformer: Transformer | undefined;
}

export class BoolFlag {
  static OxygenMonitor = new class OxygenMonitor implements BoolFlag {
    transformer = undefined
  }()

  static LeakyTank = new class LeakyTank implements BoolFlag {
    transformer = new Transformer.LeakyTank()
  }()

  static PowerRegen = new class PowerRegen implements BoolFlag {
    transformer = new Transformer.PowerRegen()
  }()

  static TimeFreeze = new class TimeFreeze implements BoolFlag {
    transformer = new Transformer.TimeFreeze()
  }()
}

export class BoolFlags extends Map<BoolFlag, boolean> { }
