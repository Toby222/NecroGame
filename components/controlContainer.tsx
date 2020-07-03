import { msgFromActions } from '../types/actions'
import { Button } from '../types/buttons'
import { Msg } from './model'

import * as React from 'react'

interface ControlContainerProps extends React.Props<ControlContainer> {
  buttons: Button[]
  onsignal?: (msg: Msg) => void
}

export class ControlContainer extends React.Component<ControlContainerProps> {
  private static bId: number = 0
  title: string = 'Control'
  buttons: Button[]
  onsignal?: (msg: Msg) => void

  constructor (props: ControlContainerProps) {
    super(props)

    this.buttons = props.buttons
    this.onsignal = props.onsignal
  }

  shouldComponentUpdate (_nextProps: Readonly<{}>, _nextState: Readonly<{}>, _nextContext: any): boolean {
    return true
  }

  render () {
    console.debug(`rendering controlContainer with buttons ${this.buttons}`)
    function renderButton (button: Button, container: ControlContainer) {
      // const button = Button.byIndex(bid)
      if (button?.actions === undefined) { return <span key={ControlContainer.bId++} /> }

      const msg = msgFromActions(button.actions)
      const onsignal = container.onsignal !== undefined ? container.onsignal : () => {}

      return (
        <span key={ControlContainer.bId++} className='control-button'>
          <button onClick={() => onsignal(msg)}>{button.toString()}</button>
        </span>
      )
    }

    return (
      <div className='container container-control'>
        <div className='title'>{this.title}</div>
        <div className='scroller'>
          {this.buttons.map(button => renderButton(button, this))}
        </div>
      </div>
    )
  }
}

export default ControlContainer
