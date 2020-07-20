export interface Resource {
  min?: number
  max?: number
  amount: number
  delta: number
  name: string
}

export class Resource {
  static Chutzpah = new class Chutzpah implements Resource {
    amount = 0
    delta = 0
    name = 'Chutzpah'
  }()

  static Oxygen = new class Oxygen implements Resource {
    amount = 0
    delta = 0
    min = 0
    max = 1000
    name = 'Oxygen'
  }()

  static Power = new class Power implements Resource {
    amount = 0
    delta = 0
    min = 0
    name = 'Power'
  }()
}
