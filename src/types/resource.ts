export interface Resource {}

export class Resource {
  static Chutzpah = new class Chutzpah implements Resource {}()
  static Oxygen = new class Oxygen implements Resource {}()
  static Power = new class Power implements Resource {}()
}

export declare type Resources = Map<Resource, [number, number]>;
