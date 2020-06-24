import { TileID } from 'tiles'

export class Player {
  current_tile: TileID

  name: string

  constructor () {
    this.current_tile = 0
    this.name = 'Spiff'
  }
}
