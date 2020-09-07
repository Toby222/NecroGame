import { BaseButton } from "../types/Buttons";
import { Model } from "./Model";

import * as React from "react";
import * as Flags from "../types/Flags";

interface ControlContainerProps {
  buttons: typeof BaseButton[];
  model: Model;
}

export class ControlContainer extends React.Component<ControlContainerProps> {
  private static bId: number = 0;
  render() {
    /**
     * Helper function to turn Buttons into Elements.
     *
     * @param button - The Button to render.
     * @param container - The Container to render in.
     * @returns Element of the Button.
     */
    function renderButton<T extends typeof BaseButton>(
      button: T,
      model: Model
    ) {
      if (!button.visible) {
        return undefined;
      }
      return (
        <button
          key={ControlContainer.bId++}
          className="btn flex-fill"
          onClick={() => {
            if (model.flags.get(Flags.Paused) ?? true) return;
            model.performActions(...button.actions);
            button.currentCooldown = button.cooldown;
            button.stats.timesUsed++;
            model.forceUpdate();
          }}
          disabled={button.currentCooldown !== 0 || !button.active}
        >
          {button.toString()}
        </button>
      );
    }

    return (
      <div className="container row">
        <h4>Controls</h4>
        <div className="container">
          {this.props.buttons.map((button) =>
            renderButton(button, this.props.model)
          )}
        </div>
      </div>
    );
  }
}

export default ControlContainer;
