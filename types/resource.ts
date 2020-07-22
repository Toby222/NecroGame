export abstract class Resource {
  abstract min?: number
  abstract max?: number
  abstract amount: number
  abstract delta: number
  abstract name: string
}

export const Chutzpah = new class Chutzpah extends Resource {
  amount = 0
  delta = 0
  max = undefined
  min = undefined
  name = 'Chutzpah'
}()

export const Oxygen = new class Oxygen extends Resource {
  amount = 0
  delta = 0
  max = 1000
  min = 0
  name = 'Oxygen'
}()

export const Power = new class Power extends Resource {
  amount = 0
  delta = 0
  max = undefined
  min = 0
  name = 'Power'
}()
