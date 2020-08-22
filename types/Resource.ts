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
