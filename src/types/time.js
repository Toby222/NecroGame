export class Time {
  constructor (seconds = 0) {
    this.seconds = seconds
  }

  increment () {
    this.seconds++
  }

  // TODO: Remove
  static from (seconds) {
    return new Time(seconds)
  }

  toString () {
    const s = this.seconds
    return `${Math.floor(s / (60 * 60 * 24))}d${Math.floor(s / (60 * 60))}h${Math.floor(s / 60)}m${s % 60}`
  }
}
