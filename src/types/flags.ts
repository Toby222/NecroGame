export interface BoolFlag {
  transformer(): Transformer | undefined;
}

export namespace BoolFlag {
  export const OxygenMonitor = new class OxygenMonitor implements BoolFlag {
    transformer () {
      return undefined
    }
  }()
  export const LeakyTank = new class LeakyTank implements BoolFlag {
    transformer () {
      return undefined /* TODO */
    }
  }()
  export const PowerRegen = new class PowerRegen implements BoolFlag {
    transformer () {
      return undefined /* TODO */
    }
  }()
}

export type BoolFlags = Map<BoolFlag, boolean>;
