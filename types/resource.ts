export interface Resource { }

export class Resource {
  static Chutzpah = new class Chutzpah implements Resource { toString () { return 'Chutzpah' } }()
  static Oxygen = new class Oxygen implements Resource { toString () { return 'Oxygen' } }()
  static Power = new class Power implements Resource { toString () { return 'Power' } }()
}

export class Resources extends Map<Resource, [number, number]> {}
