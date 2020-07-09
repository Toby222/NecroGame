import { definedTiles } from './tiles'

export class Player {
  currentTileID: number

  name: string

  constructor () {
    this.currentTileID = 0
    this.name = 'Spiff'
  }

  get currentTile () {
    const tile = definedTiles(this.currentTileID)
    if (tile === undefined) {
      throw new Error('Player is in undefined Tile')
    }
    return tile
  }
}
