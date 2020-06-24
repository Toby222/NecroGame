import { Time } from 'time'

export class Message {
  constructor (content: string, time: Time) {

  }

  toString () {
    return `${this.time}: ${this.content}`
  }

  time: Time
  content: string
}
