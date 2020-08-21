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
        <div key={messageId} className="row">
          <span className="col-2 pr-15 text-right">
            {message.time.toString()}
          </span>
          <span className="col-9">{message.content}</span>
        </div>
      );
    }

    return (
      <div className="container flex-column d-flex justify-content-start row messages-container overflow-hidden">
        <div className="col-auto">
          <h4 className="row h-50">{this.title}</h4>
          {this.messages
            .slice(0, MessagesContainer.messageCount)
            .map((msg, idx) => renderMessage(idx, msg))}
        </div>
      </div>
    );
  }
}
export default MessagesContainer;
