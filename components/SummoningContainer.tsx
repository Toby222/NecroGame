import { Game } from "./Game";

import * as React from "react";

interface SummoningContainerProps {
  game: Game;
}

export class SummoningContainer extends React.Component<SummoningContainerProps> {
  render() {
    return (
      <div id="summoningContainer" className="tabcontent">
        <h4 className="us-none">Summoning</h4>
      </div>
    );
  }
}

export default SummoningContainer;
