import { Time } from './time'

export class Message {
  time: Time
  content: string

  constructor (content: string, time: Time) {
    this.content = content
    this.time = new Time(time)
  }

  toString () {
    return `${this.time}: ${this.content}`
  }
}
