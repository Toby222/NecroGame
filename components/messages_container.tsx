import { Message } from '../types/messages'

import * as React from 'react'

interface MessagesContainerProps extends React.Props<MessagesContainer> {
  messages: Message[]
}

export class MessagesContainer extends React.Component<MessagesContainerProps> {
  private static mId: number = 0
  title: string = 'Messages'
  messages: Message[]

  constructor (props: MessagesContainerProps) {
    super(props)

    this.messages = props.messages
  }

  shouldComponentUpdate (nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
    return true
  }

  render () {
    console.log(MessagesContainer.mId)
    function renderMessage (message: Message) {
      return <li key={MessagesContainer.mId++} className="message">
        <span className="message-time">{message.time.toString()}</span>
        {` ${message.content}`}
      </li>
    }
    return <div className="container container-messages">
      <div className="title">{this.title}</div>
      <div className="scroller">
        <ul>{Array.from(this.messages.entries(), ([id, msg], i) => renderMessage(msg))}</ul>
      </div>
    </div>
  }
}
export default MessagesContainer
