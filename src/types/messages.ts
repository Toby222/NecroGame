import { Time } from 'time'

export class Message {
  constructor (content: string, time: Time) {
    this.content = content
    this.time = time
  }

  toString () {
    return `${this.time}: ${this.content}`
  }

  private time: Time
  private content: string
}
