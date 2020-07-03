export interface Resource {
  amount: number
  delta: number
}

export class Resource {
  static Chutzpah = new class Chutzpah implements Resource {
    amount = 0
    delta = 0

    toString () {
      return 'Chutzpah'
    }
  }()

  static Oxygen = new class Oxygen implements Resource {
    amount = 0
    delta = 0

    toString () {
      return 'Oxygen'
    }
  }()

  static Power = new class Power implements Resource {
    amount = 0
    delta = 0

    toString () {
      return 'Power'
    }
  }()
}
