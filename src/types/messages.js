export class Message {
  constructor (content, time) {
    this.content = content
    this.time = time
  }

  toString () {
    return `${this.time}: ${this.content}`
  }
}
