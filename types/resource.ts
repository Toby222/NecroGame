export interface Resource { }

export class Resource {
  static Chutzpah = new class Chutzpah implements Resource { }()
  static Oxygen = new class Oxygen implements Resource { }()
  static Power = new class Power implements Resource { }()
}

export class Resources extends Map<Resource, [number, number]> {
  constructor() {
    super()
  }
}
