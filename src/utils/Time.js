import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super()

    this.bind()

    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.playing = true

    this.tick();
  }

  play() {
    this.playing = true
  }

  pause() {
    this.playing = false
  }

  tick() {
    this.ticker = window.requestAnimationFrame(this.tick)

    const current = Date.now()

    this.delta = current - this.current
    this.elapsed += this.playing ? this.delta : 0
    this.current = current

    if(this.delta > 60) {
      this.delta = 60
    }

    if(this.playing) {
      this.trigger('tick')
    }
  }

  stop() {
    window.cancelAnimationFrame(this.ticker)
  }

  bind() {
    this.tick = this.tick.bind(this)
  }
}