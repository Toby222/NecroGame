import React from "react";

import { Button } from "src/components/Button";
import { Tab } from "src/components/Tabs/Tab";

import { BaseButton } from "src/types/Button";

interface ControlsTabProps {
  buttons: typeof BaseButton[];
}

export class ControlsTab extends Tab<ControlsTabProps> {
  renderTab() {
    return (
      <>
        <h4 className="us-none">Controls</h4>
        {this.props.buttons.map((button) => (
          <Button key={button.toString()} button={button} game={this.props.game} />
        ))}
      </>
    );
  }
}
