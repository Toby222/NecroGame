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
    const days = Math.abs(this.days);
    const hours = Math.abs(this.hours % 24);
    const minutes = Math.abs(this.minutes % 60);
    const seconds = Math.abs(this.seconds % 60);

    const daysString = String(days).padStart(1, "0") + "d ";
    const hoursString = String(hours).padStart(2, "0") + "h ";
    const minutesString = String(minutes).padStart(2, "0") + "m ";
    const secondsString = String(seconds).padStart(2, "0") + "s";
    return (
      (this.seconds < 0 ? "-" : "") +
      `${daysString}${hoursString}${minutesString}${secondsString}`
    );
  }
}
