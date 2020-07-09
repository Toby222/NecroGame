export class Time {
  seconds: number

  constructor (val: number | Time = 0) {
    if (val instanceof Time) {
      this.seconds = val.seconds
    } else {
      this.seconds = val
    }
  }

  valueOf () {
    return this.seconds
  }

  toString () {
    const days = String(Math.floor(this.seconds / (60 * 60 * 24))).padStart(1, '0')
    const hours = String(Math.floor(this.seconds / (60 * 60))).padStart(2, '0')
    const minutes = String(Math.floor(this.seconds / 60)).padStart(2, '0')
    const seconds = String(this.seconds % 60).padStart(2, '0')
    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }
}
