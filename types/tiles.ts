import { Button } from './buttons'

export class Tile {
  name: string
  art: string
  buttons: Button[]

  constructor (name: string = 'Wasteland', art: string = '........', buttons: Button[]) {
    this.name = name
    this.art = art
    this.buttons = buttons
  }

  toString (): string {
    return this.name
  }
}

export function definedTiles (id: number): Tile | undefined {
  switch (id) {
    case 0:
      return new Tile('Ship', '..::^::..', [Button.Wait])
    case 1:
      return new Tile('Field', '.......!!!!!.....', [])
    default:
      return undefined
  }
}
