import { Player } from "../types/Player";

import * as React from "react";
import { Time } from "../types/Time";

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
export default StatsContainer;
