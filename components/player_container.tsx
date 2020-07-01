import { Player } from '../types/player'
import { definedTiles } from '../types/tiles'

import MapContainer from '../components/map_container'

import * as React from 'react'

interface PlayerContainerProps extends React.Props<PlayerContainer> {
  player: Player
}

export class PlayerContainer extends React.Component<PlayerContainerProps> {
  player: Player

  constructor(props: PlayerContainerProps) {
    super(props)

    this.player = props.player
  }

  render() {
    return <div className="container container-Player">
      <div className="title">{this.player.name}</div>
      <div className="scroller">
        {`Name: ${this.player.name}, Current tile: ${this.player.currentTile}`}
      </div>
      <MapContainer tile={definedTiles(this.player.currentTile)}/>
    </div>
  }
}
export default PlayerContainer