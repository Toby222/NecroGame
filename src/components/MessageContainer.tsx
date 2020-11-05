import React from "react";

import { Message } from "src/types/Message";

interface MessagesContainerProps {
  messages: Message[];
}

export class MessagesContainer extends React.Component<MessagesContainerProps> {
  private static readonly messageCount = 15;
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
        <div key={messageId} className="row flex-column w-full font-size-14 necro-message">
          <span className="row pr-15 text-right text-decoration-underline">{message.time.toString()}</span>
          <span className="row">{message.content}</span>
        </div>
      );
    }

    return (
      <div id="messages" className="justify-content-start us-none overflow-hidden">
        <h4>Messages</h4>
        {this.props.messages.slice(0, MessagesContainer.messageCount).map((msg, idx) => renderMessage(idx, msg))}
      </div>
    );
  }
}
