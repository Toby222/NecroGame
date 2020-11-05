import { BaseButton } from "../../../types/Buttons";
import { Game } from "../../Game";

import React from "react";
import { Button } from "../../Button";
import { Tab } from "../Tabs";

interface ControlsTabProps {
  buttons: typeof BaseButton[];
  game: Game;
}

export class ControlsTab extends Tab<ControlsTabProps> {
  renderTab() {
    return (
      <>
        <h4 className="us-none">Controls</h4>
        {this.props.buttons.map((button) => (
          <Button key={button.toString()} button={button} model={this.props.game} />
        ))}
      </>
    );
  }
}
