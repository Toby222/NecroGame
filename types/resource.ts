export abstract class Resource {
  /** Optional minimum value */
  abstract min?: number;
  /** Optional maximum value */
  abstract max?: number;
  /** Initial amount */
  abstract amount: number;
  /** Initial increase (negative values for initial loss) */
  abstract delta: number;
  /** Name of the resource */
  abstract name: string;
}

export const Chutzpah = new (class Chutzpah extends Resource {
  amount = 0;
  delta = 0;
  max = undefined;
  min = undefined;
  name = "Chutzpah";
})();

export const Oxygen = new (class Oxygen extends Resource {
  amount = 0;
  delta = 0;
  max = 1000;
  min = 0;
  name = "Oxygen";
})();

export const Power = new (class Power extends Resource {
  amount = 0;
  delta = 0;
  max = undefined;
  min = 0;
  name = "Power";
})();
