import { BaseButton } from "../types/Buttons";
import { Game } from "./Game";

import * as React from "react";
import * as Flags from "../types/Flags";

interface ButtonProps {
  button: typeof BaseButton;
  model: Game;
}

export class Button extends React.Component<ButtonProps> {
  render() {
    if (!this.props.button.visible) {
      return <></>;
    }
    let button = (
      <div className="flex-column">
        <button
          className="btn row"
          onClick={() => {
            if (this.props.model.flags.get(Flags.Paused) ?? true) return;
            this.props.model.performActions(...this.props.button.actions);
            this.props.button.currentCooldown = this.props.button.cooldown;
            this.props.button.stats.timesUsed++;
            this.props.model.forceUpdate();
          }}
          disabled={this.props.button.currentCooldown !== 0 || !this.props.button.active}
        >
          {this.props.button.toString()}
        </button>
        {this.props.button.cooldown !== 0 && this.props.button.currentCooldown !== 0 ? (
          <div
            className="row progress progress-bar"
            style={{ width: `${100 * (1 - this.props.button.currentCooldown / this.props.button.cooldown)}%` }}
          />
        ) : (
          <div className="row" />
        )}
      </div>
    );

    return button;
  }
}

export default Button;
