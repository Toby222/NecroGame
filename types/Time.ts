export class Time {
  seconds: number;
  get minutes() {
    return Math.trunc(this.seconds / 60);
  }
  get hours() {
    return Math.trunc(this.minutes / 60);
  }
  get days() {
    return Math.trunc(this.hours / 24);
  }

  constructor(val: number | Time = 0) {
    if (val instanceof Time) {
      this.seconds = val.seconds;
    } else {
      this.seconds = val;
    }
  }

  valueOf() {
    return this.seconds;
  }

  toString() {
    const days = `${Math.abs(this.days)}`.padStart(1, "0");
    const hours = `${Math.abs(this.hours % 24)}`.padStart(2, "0");
    const minutes = `${Math.abs(this.minutes % 60)}`.padStart(2, "0");
    const seconds = `${Math.abs(this.seconds % 60)}`.padStart(2, "0");

    return (this.seconds < 0 ? "-" : "") + `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
