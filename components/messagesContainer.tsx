import { Message } from "../types/messages";

import * as React from "react";

interface MessagesContainerProps {
  messages: Message[];
}

export class MessagesContainer extends React.Component<MessagesContainerProps> {
  private static readonly messageCount = 30;
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
          <span className="col-auto pr-15 text-right">
            {message.time.toString()}
          </span>
          <span className="col">{message.content}</span>
        </div>
      );
    }

    return (
      <div className="container flex-column d-flex justify-content-start row messages-container overflow-hidden">
        <div className="col-auto">
          <h4 className="row">Messages</h4>
          {this.props.messages
            .slice(0, MessagesContainer.messageCount)
            .map((msg, idx) => renderMessage(idx, msg))}
        </div>
      </div>
    );
  }
}
export default MessagesContainer;
