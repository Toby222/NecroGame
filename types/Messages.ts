import { Time } from "./Time";

export class Message {
  /** The content of the Message */
  content: string;
  /** The time that the Message was sent */
  time: Time;

  /**
   * Represents a message to the player.
   *
   * Shown in the {@link MessagesContainer}
   *
   * @param content The content of the Message
   * @param time The time that the Message was sent
   */
  constructor(content: string, time: Time) {
    this.content = content;
    this.time = new Time(time);
  }

  toString() {
    return `${this.time}: ${this.content}`;
  }
}
