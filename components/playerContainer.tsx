import { Player } from '../types/player'

import * as React from 'react'

interface PlayerContainerProps extends React.Props<PlayerContainer> {
  player: Player
}

export class PlayerContainer extends React.Component<PlayerContainerProps> {
  player: Player

  constructor (props: PlayerContainerProps) {
    super(props)

    this.player = props.player
  }

  shouldComponentUpdate (_nextProps: Readonly<{}>, _nextState: Readonly<{}>, _nextContext: any): boolean {
    return true
  }

  render () {
    return (
      <div className='container container-player'>
        <div className='title'>{this.player.name}</div>
        <div className='scroller'>
          {`Name: ${this.player.name}`}<br />{`Current tile: ${this.player.currentTile}`}
        </div>
      </div>
    )
  }
}
export default PlayerContainer
