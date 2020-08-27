import { BaseButton } from "../types/Buttons";
import { Model } from "./Model";

import * as React from "react";

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
        return <></>;
      }
      return (
        <button
          key={ControlContainer.bId++}
          className="btn flex-fill"
          onClick={() => {
            model.performActions(...button.actions);
            model.forceUpdate();
          }}
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
