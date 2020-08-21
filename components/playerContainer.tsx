import { Player } from "../types/player";

import * as React from "react";
import { Time } from "../types/time";

interface PlayerContainerProps {
  player: Player;
  time: Time;
}

export class PlayerContainer extends React.Component<PlayerContainerProps> {
  render() {
    return (
      <div className="container">
        <h1 className="sidebar-title">{this.props.player.name}</h1>
        <div className="text-right">{this.props.time.toString()}</div>
        <div>Magic~~</div>
      </div>
    );
  }
}
export default PlayerContainer;
