export class BaseResource {
  /** Optional minimum value */
  static min: number = 0;
  /** Optional maximum value */
  static max: number = Infinity;
  /** Initial amount */
  static amount: number = 0;
  /** Initial increase (negative values for initial loss) */
  static delta: number = 0;
  /** Name of the resource */
  static resourceName: string = "MISSINGNO.";
}

export class Dirt extends BaseResource {
  static resourceName = "Dirt";
}

export class Bones extends BaseResource {
  static resourceName = "Bones";
}
