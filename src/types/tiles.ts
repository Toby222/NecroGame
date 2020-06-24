import { Buttons } from 'buttons'

export class Tile {
  name: string

  art: string

  buttons: Buttons

  constructor (name: string = 'Wasteland', art: string = '........',
    buttons: Buttons = []) {
    this.name = name
    this.art = art
    this.buttons = buttons
  }

  toString (): string {
    return this.name
  }
}

export type TileID = number
export type Tiles = Map<TileID, Tile>

export function defined_tiles (id: TileID): Tile | undefined {
  switch (id) {
    case 0:
      return new Tile('Ship', '..::^::..', [0])
    case 1:
      return new Tile('Field', '.......!!!!!.....', [])
    default:
      return undefined
  }
}
