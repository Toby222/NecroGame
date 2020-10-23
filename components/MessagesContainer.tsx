import { Message } from "../types/Messages";

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
        <div key={messageId} className="row font-size-12">
          <span className="row pr-15 text-right us-none text-decoration-underline">{message.time.toString()}</span>
          <span className="row w-full cursor-default">{message.content}</span>
          <span className="row w-full"><br/></span>
        </div>
      );
    }

    return (
      <div className="container flex-column d-flex justify-content-start row-auto messages-container overflow-y-scroll">
        <div className="col-auto">
          <h4 className="us-none">Messages</h4>
          {this.props.messages.slice(0, MessagesContainer.messageCount).map((msg, idx) => renderMessage(idx, msg))}
        </div>
      </div>
    );
  }
}
export default MessagesContainer;
