import { Transformer } from 'transformers'

export interface BoolFlag {
  transformer(): Transformer | undefined;
}

export namespace BoolFlag {
  export const OxygenMonitor = new class OxygenMonitor implements BoolFlag {
    transformer = undefined
  }()
  export const LeakyTank = new class LeakyTank implements BoolFlag {
    transformer = new Transformer.LeakyTank()
  }()
  export const PowerRegen = new class PowerRegen implements BoolFlag {
    transformer = new Transformer.PowerRegen()
  }()
}

export type BoolFlags = Map<BoolFlag, boolean>;
