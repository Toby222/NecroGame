import { Message } from '../types/messages'

import * as React from 'react'

interface MessagesContainerProps extends React.Props<MessagesContainer> {
  messages: Message[]
}

export class MessagesContainer extends React.Component<MessagesContainerProps> {
  title: string = 'Messages'
  messages: Message[]

  constructor (props: MessagesContainerProps) {
    super(props)

    this.messages = props.messages
  }

  shouldComponentUpdate (_nextProps: Readonly<{}>, _nextState: Readonly<{}>, _nextContext: any): boolean {
    return true
  }

  render () {
    function renderMessage (mId: number, message: Message) {
      return (
        <li key={mId} className='message'>
          <span className='message-time'>{message.time.toString()}</span>
          {` ${message.content}`}
        </li>
      )
    }
    return (
      <div className='container container-messages'>
        <div className='title'>{this.title}</div>
        <div className='scroller'>
          <ul>{Array.from(this.messages.entries(), ([idx, msg], _i) => renderMessage(idx, msg))}</ul>
        </div>
      </div>
    )
  }
}
export default MessagesContainer
