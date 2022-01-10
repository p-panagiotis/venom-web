
class Timer {
  
  constructor(callback, delay) {
    this.timerId = null;
    this.start = delay;
    this.remaining = delay;
    this.callback = callback;

    this.resume();
  }

  clear() {
    clearTimeout(this.timerId);
  }

  pause() {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback, this.remaining);
  }
}

export default Timer;
