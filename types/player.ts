import { TileID } from './tiles'

export class Player {
  currentTile: TileID

  name: string

  constructor () {
    this.currentTile = 0
    this.name = 'Spiff'
  }
}
