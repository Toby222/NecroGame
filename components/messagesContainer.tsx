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
    /**
     * Helper function to turn Messages into Elements.
     *
     * @param messageId - ID of the Message inside the MessagesContainer.
     * @param message - The Message to render.
     * @returns Element of the Message.
     */
    function renderMessage (messageId: number, message: Message) {
      return (
        <li key={messageId} className='message'>
          <span className='message-time'>{message.time.toString()}</span>
          {message.content}
        </li>
      )
    }
    return (
      <div className='container container-messages'>
        <div className='title'>{this.title}</div>
        <div className='scroller'>
          <ul>{this.messages.slice(0, 15).map((msg, idx) => renderMessage(idx, msg))}</ul>
        </div>
      </div>
    )
  }
}
export default MessagesContainer
