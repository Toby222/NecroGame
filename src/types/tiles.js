export class Tile {
  constructor (name = 'Wasteland', art = '........', buttons = []) {
    this.name = name
    this.art = art
    this.buttons = buttons
  }

  toString () {
    return this.name
  }
}
export function defined_tiles (id) {
  switch (id) {
    case 0:
      return new Tile('Ship', '..::^::..', [0])
    case 1:
      return new Tile('Field', '.......!!!!!.....', [])
    default:
      return undefined
  }
}
