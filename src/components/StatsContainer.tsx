import React from "react";

import { Time } from "src/types/Time";
import { Player } from "src/types/Player";

interface StatsContainerProps {
  player: Player;
  time: Time;
}

export class StatsContainer extends React.Component<StatsContainerProps> {
  render() {
    return (
      <div id="playerContainer" className="us-none row-auto">
        <h4>Statistics</h4>
        <div className="row">
          <span className="col">Time:</span>
          <div className="text-right col-auto">{this.props.time.toString()}</div>
        </div>
      </div>
    );
  }
}
