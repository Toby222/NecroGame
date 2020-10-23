import { BaseButton } from "../types/Buttons";
import { Game } from "./Game";

import * as React from "react";
import { Button } from "./Button";

interface ButtonContainerProps {
  buttons: typeof BaseButton[];
  model: Game;
}

export class ButtonContainer extends React.Component<ButtonContainerProps> {
  render() {
    return (
      <div id="buttonContainer">
        <h4 className="us-none">Controls</h4>
        <div className="d-flex">
          {this.props.buttons.map((button) => (
            <Button key={button.toString()} button={button} model={this.props.model} />
          ))}
        </div>
      </div>
    );
  }
}

export default ButtonContainer;
