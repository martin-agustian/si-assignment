import {
  defineComponent,
  h
} from "./chunk-EW6SBXYQ.js";
import "./chunk-ENMAWK7U.js";

// node_modules/@chenfengyuan/vue-countdown/dist/vue-countdown.esm.js
var MILLISECONDS_SECOND = 1e3;
var MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
var MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
var MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;
var EVENT_ABORT = "abort";
var EVENT_END = "end";
var EVENT_PROGRESS = "progress";
var EVENT_START = "start";
var EVENT_VISIBILITY_CHANGE = "visibilitychange";
var index = defineComponent({
  name: "VueCountdown",
  props: {
    autoStart: {
      type: Boolean,
      default: true
    },
    emitEvents: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1e3,
      validator: (value) => value >= 0
    },
    now: {
      type: Function,
      default: () => Date.now()
    },
    tag: {
      type: String,
      default: "span"
    },
    time: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0
    },
    transform: {
      type: Function,
      default: (props) => props
    }
  },
  emits: [
    EVENT_ABORT,
    EVENT_END,
    EVENT_PROGRESS,
    EVENT_START
  ],
  data() {
    return {
      counting: false,
      endTime: 0,
      totalMilliseconds: 0,
      requestId: 0
    };
  },
  computed: {
    days() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
    },
    hours() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_DAY / MILLISECONDS_HOUR);
    },
    minutes() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_HOUR / MILLISECONDS_MINUTE);
    },
    seconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_MINUTE / MILLISECONDS_SECOND);
    },
    milliseconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
    },
    totalDays() {
      return this.days;
    },
    totalHours() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
    },
    totalMinutes() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
    },
    totalSeconds() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
    }
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.totalMilliseconds = this.time;
        this.endTime = this.now() + this.time;
        if (this.autoStart) {
          this.start();
        }
      }
    }
  },
  mounted() {
    document.addEventListener(EVENT_VISIBILITY_CHANGE, this.handleVisibilityChange);
  },
  beforeUnmount() {
    document.removeEventListener(EVENT_VISIBILITY_CHANGE, this.handleVisibilityChange);
    this.pause();
  },
  methods: {
    start() {
      if (this.counting) {
        return;
      }
      this.counting = true;
      if (this.emitEvents) {
        this.$emit(EVENT_START);
      }
      if (document.visibilityState === "visible") {
        this.continue();
      }
    },
    continue() {
      if (!this.counting) {
        return;
      }
      const delay = Math.min(this.totalMilliseconds, this.interval);
      if (delay > 0) {
        let init;
        let prev;
        const step = (now) => {
          if (!init) {
            init = now;
          }
          if (!prev) {
            prev = now;
          }
          const range = now - init;
          if (range >= delay || range + (now - prev) / 2 >= delay) {
            this.progress();
          } else {
            this.requestId = requestAnimationFrame(step);
          }
          prev = now;
        };
        this.requestId = requestAnimationFrame(step);
      } else {
        this.end();
      }
    },
    pause() {
      cancelAnimationFrame(this.requestId);
    },
    progress() {
      if (!this.counting) {
        return;
      }
      this.totalMilliseconds -= this.interval;
      if (this.emitEvents && this.totalMilliseconds > 0) {
        this.$emit(EVENT_PROGRESS, {
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
          milliseconds: this.milliseconds,
          totalDays: this.totalDays,
          totalHours: this.totalHours,
          totalMinutes: this.totalMinutes,
          totalSeconds: this.totalSeconds,
          totalMilliseconds: this.totalMilliseconds
        });
      }
      this.continue();
    },
    abort() {
      if (!this.counting) {
        return;
      }
      this.pause();
      this.counting = false;
      if (this.emitEvents) {
        this.$emit(EVENT_ABORT);
      }
    },
    end() {
      if (!this.counting) {
        return;
      }
      this.pause();
      this.totalMilliseconds = 0;
      this.counting = false;
      if (this.emitEvents) {
        this.$emit(EVENT_END);
      }
    },
    update() {
      if (this.counting) {
        this.totalMilliseconds = Math.max(0, this.endTime - this.now());
      }
    },
    handleVisibilityChange() {
      switch (document.visibilityState) {
        case "visible":
          this.update();
          this.continue();
          break;
        case "hidden":
          this.pause();
          break;
      }
    }
  },
  render() {
    return h(this.tag, this.$slots.default ? [
      this.$slots.default(this.transform({
        days: this.days,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        milliseconds: this.milliseconds,
        totalDays: this.totalDays,
        totalHours: this.totalHours,
        totalMinutes: this.totalMinutes,
        totalSeconds: this.totalSeconds,
        totalMilliseconds: this.totalMilliseconds
      }))
    ] : void 0);
  }
});

// dep:@chenfengyuan_vue-countdown
var chenfengyuan_vue_countdown_default = index;
export {
  chenfengyuan_vue_countdown_default as default
};
/*! vue-countdown v2.0.0 | (c) 2018-present Chen Fengyuan | MIT */
//# sourceMappingURL=@chenfengyuan_vue-countdown.js.map
