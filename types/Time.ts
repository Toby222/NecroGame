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

  /**
   * Create a copy of a Time object
   * @param other A time to copy the value form
   */
  constructor(other: Time);
  /**
   * Create a Time object with a specific amount of seconds
   * @param seconds The value of the Time in seconds
   */
  constructor(seconds: number);
  /**
   * Create a Time object with value 0
   */
  constructor();
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
    const prefix = this.seconds < 0 ? "-" : "";
    const seconds = `${Math.abs(this.seconds % 60)}`.padStart(2, "0");
    const minutes = `${Math.abs(this.minutes % 60)}`.padStart(2, "0");
    const hours = `${Math.abs(this.hours % 24)}`.padStart(2, "0");
    const days = `${Math.abs(this.days)}`.padStart(1, "0");

    return `${prefix}${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
