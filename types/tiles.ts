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

/**
 * Get a Tile by its ID.
 *
 * @param id - The ID of the Tile to look for.
 * @deprecated This is dumb. Should be a Map, or just plain removed.
 * @returns The found Tile, or undefined if not found.
 */
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
