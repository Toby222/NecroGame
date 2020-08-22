export class Time {
  seconds: number;

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
    const days = Math.trunc(this.seconds / (60 * 60 * 24));
    const hours = Math.trunc(this.seconds / (60 * 60)) % 24;
    const minutes = Math.trunc(this.seconds / 60) % 60;
    const seconds = this.seconds % 60;

    const daysString = String(days).padStart(1, "0") + "d ";
    const hoursString = String(hours).padStart(2, "0") + "h ";
    const minutesString = String(minutes).padStart(2, "0") + "m ";
    const secondsString = String(seconds).padStart(2, "0") + "s";
    return `${daysString}${hoursString}${minutesString}${secondsString}`;
  }
}
