import { Tile } from '../types/tiles'

import * as React from 'react'

interface MapContainerProps extends React.Props<MapContainer> {
  tile: Tile
}

export class MapContainer extends React.Component<MapContainerProps> {
  title: string = 'Map'
  tile: Tile

  constructor(props: MapContainerProps) {
    super(props)

    this.tile = props.tile
  }

  render() {
    return <div className="container container-map">
      <div className="title">{this.title}</div>
      <div className="scroller">
      <div className="tile-title">{this.tile.toString()}</div>
      <div className="tile-art">{this.tile.art}</div>
      </div>
    </div>
  }
}
export default MapContainer