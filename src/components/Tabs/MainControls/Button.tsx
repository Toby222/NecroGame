import { BaseButton } from "../../../types/Buttons";
import { Game } from "../../Game";

import * as React from "react";
import * as Flags from "../../../types/Flags";

interface ButtonProps {
  button: typeof BaseButton;
  model: Game;
}

export class Button extends React.Component<ButtonProps> {
  render() {
    if (!this.props.button.visible) {
      return <></>;
    }
    const button = (
      <button
        className="btn position-relative"
        onClick={() => {
          if (this.props.model.flags.get(Flags.Paused.Instance) ?? true) return;
          this.props.model.performActions(...this.props.button.actions);
          this.props.button.currentCooldown = this.props.button.cooldown;
          this.props.button.stats.timesUsed++;
          this.props.model.forceUpdate();
        }}
        disabled={this.props.button.currentCooldown !== 0 || !this.props.button.active}
      >
        <span className="z-10 position-relative">{this.props.button.toString()}</span>
        <div className="progress position-absolute h-full">
          {this.props.button.currentCooldown !== 0 ? (
            <div
              className="progress-bar z-0"
              style={{ width: `${100 * (1 - (this.props.button.currentCooldown - 1) / this.props.button.cooldown)}%` }}
            />
          ) : (
            <div className="progress-bar z-0" style={{ width: 0, transition: "width 0s" }} />
          )}
        </div>
      </button>
    );

    return button;
  }
}

export default Button;
