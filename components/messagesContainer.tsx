import { Message } from "../types/messages";

import * as React from "react";

interface MessagesContainerProps {
  messages: Message[];
}

export class MessagesContainer extends React.Component<MessagesContainerProps> {
  title: string = "Messages";
  messages: Message[];

  private static readonly messageCount = 15;

  constructor(props: MessagesContainerProps) {
    super(props);

    this.messages = props.messages;
  }

  shouldComponentUpdate(
    _nextProps: Readonly<{}>,
    _nextState: Readonly<{}>,
    _nextContext: any
  ): boolean {
    return true;
  }

  render() {
    /**
     * Helper function to turn Messages into Elements.
     *
     * @param messageId - ID of the Message inside the MessagesContainer.
     * @param message - The Message to render.
     * @returns Element representing the Message.
     */
    function renderMessage(messageId: number, message: Message) {
      return (
        <li key={messageId} className="row">
          <span className="w-150 pr-15 text-right">
            {message.time.toString()}
          </span>
          <span>{message.content}</span>
        </li>
      );
    }

    return (
      <div className="container row messages-container overflow-hidden">
        <h4>{this.title}</h4>
        <div className="d-flex flex-column-reverse container">
          {this.messages
            .slice(0, MessagesContainer.messageCount)
            .map((msg, idx) => renderMessage(idx, msg))}
        </div>
      </div>
    );
  }
}
export default MessagesContainer;
