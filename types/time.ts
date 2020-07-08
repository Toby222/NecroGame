export class Time {
  seconds: number

  constructor (seconds: number = 0) {
    this.seconds = seconds
  }

  clone (): Time {
    return new Time(this.seconds)
  }

  increment () {
    this.seconds++
  }

  valueOf () {
    return this.seconds
  }

  toString () {
    const days = String(Math.floor(this.seconds / (60 * 60 * 24))).padStart(1, '0')
    const hours = String(Math.floor(this.seconds / (60 * 60))).padStart(2, '0')
    const minutes = String(Math.floor(this.seconds / 60)).padStart(2, '0')
    const seconds = String(this.seconds % 60).padStart(2, '0')
    return `${days}d${hours}h${minutes}m${seconds}s`
  }
}
