export interface Resource {}

export namespace Resource {
  export const Chutzpah = new class Chutzpah implements Resource {}()
  export const Oxygen = new class Oxygen implements Resource {}()
  export const Power = new class Power implements Resource {}()
}

export type Resources = Map<Resource, [number, number]>;
