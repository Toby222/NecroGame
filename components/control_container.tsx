import { msgFromActions } from '../types/actions'
import { Button, ButtonID, Buttons } from '../types/buttons'
import { Msg } from '../pages/impact'

import * as React from 'react'

interface ControlContainerProps extends React.Props<ControlContainer> {
  buttons: Buttons
  onsignal?: (msg: Msg) => void
}

export class ControlContainer extends React.Component<ControlContainerProps> {
  title: string = 'Control'
  buttons: Buttons
  onsignal?: (msg: Msg) => void

  constructor (props: ControlContainerProps) {
    super(props)

    this.buttons = props.buttons
    this.onsignal = props.onsignal
  }

  shouldComponentUpdate (nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
    return true
  }

  render () {
    console.debug("CONTROLCONTAINER RENDER", this.buttons)
    function renderButton (bid: ButtonID, container: ControlContainer) {
      const button = Button.byIndex(bid)
      if (button === undefined) { return <></> }

      const msg = msgFromActions(button.actions)
      const onsignal = container.onsignal !== undefined ? container.onsignal : () => {}

      return <span key={bid} className="control-button">
        <button onClick={() => onsignal(msg)}>{button.toString()}</button>
      </span>
    }

    return <div className="container container-control">
      <div className="title">{this.title}</div>
      <div className="scroller">
        {this.buttons.map(button => renderButton(button, this))}
      </div>
    </div>
  }
}

export default ControlContainer
