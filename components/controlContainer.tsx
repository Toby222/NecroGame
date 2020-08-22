import { Button } from "../types/Buttons";
import { Model, Msg } from "./Model";

import * as Actions from "../types/Actions";

import * as React from "react";

interface ControlContainerProps {
  buttons: Button[];
  callback?: (msg: Msg) => void;
  model: Model;
}

/**
 * Turn an array of Actions into a Msg to perform.
 *
 * @param actions - The Actions to turn into a Msg.
 * @returns The resulting Msg.
 */
function msgFromActions(actions: Actions.Action[]): Msg {
  if (actions.length === 0) {
    return new Msg.PerformAction(new Actions.Wait(1));
  } else if (actions.length === 1) {
    return new Msg.PerformAction(actions[0]);
  }

  return new Msg.Bulk(actions.map((action) => new Msg.PerformAction(action)));
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
    function renderButton(button: Button, model: Model) {
      if (button.actions === undefined) {
        return <></>;
      }

      const msg = msgFromActions(button.actions);

      return (
        <button
          key={ControlContainer.bId++}
          className="btn flex-fill"
          onClick={() => msg.act(model)}
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
