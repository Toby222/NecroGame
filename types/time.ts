export class Time {
  seconds: number

  constructor (seconds: number = 0) {
    this.seconds = seconds
  }

  increment () {
    this.seconds++
  }

  toString () {
    const s = this.seconds
    return `${Math.floor(s / (60 * 60 * 24))}d${Math.floor(s / (60 * 60))}h${Math.floor(s / 60)}m${s % 60}`
  }
}
