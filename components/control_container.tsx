import { msgFromActions } from '../types/actions'
import { Button, ButtonID, Buttons } from '../types/buttons'
import { Msg as ImpactMessage } from '../pages/impact'

import * as React from 'react'

class Message {
  static ButtonPressed = class ButtonPressed {
    constructor(_: ImpactMessage) {

    }
  }
}

export interface ControlContainerProps extends React.Props<ControlContainer> {
  buttons: Buttons
  onsignal?: (msg: ImpactMessage) => ImpactMessage
}

export class ControlContainer extends React.Component<ControlContainerProps> {
  title: string = 'Control'
  buttons: Buttons
  onsignal?: (msg: ImpactMessage) => ImpactMessage

  constructor(props: ControlContainerProps) {
    super(props)

    this.buttons = props.buttons
    this.onsignal = props.onsignal
  }

  render() {
    function viewButton(bid: ButtonID, container: ControlContainer) {
      const button = Button.byIndex(bid)
      if (button === undefined) { return <></> }
      const msg = msgFromActions(button.actions)

      if (container.onsignal === undefined) {
        return <span className="control-button">
          <button />
        </span>
      }
    }

    return <div className="container container-control">
      <div className="title">{this.title}</div>
      <div className="scroller">
        {this.buttons.map(button => viewButton(button, this))}
      </div>
    </div>
  }

  change(props: ControlContainerProps) {
    this.buttons = props.buttons
    this.onsignal = props.onsignal
  }
}
