import { Player } from "../types/player";

import * as React from "react";

interface PlayerContainerProps {
  player: Player;
}

export class PlayerContainer extends React.Component<PlayerContainerProps> {
  player: Player;

  constructor(props: PlayerContainerProps) {
    super(props);

    this.player = props.player;
  }

  shouldComponentUpdate(
    _nextProps: Readonly<{}>,
    _nextState: Readonly<{}>,
    _nextContext: any
  ): boolean {
    return true;
  }

  render() {
    return (
      <div className="container">
        <h1 className="sidebar-title">{this.player.name}</h1>
        <div>Magic~~</div>
      </div>
    );
  }
}
export default PlayerContainer;
