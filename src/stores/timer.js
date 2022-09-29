import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      longBreakIntarval: 4,
      //
      isCounting: false,
      //
      displayModel: false,
      confirmChange: false,
      //
      startPromodoro: true,
      promodoro: 9,
      finishedPromodoros: 0,
      //
      startShortBreak: false,
      shortBreak: 4,
      //
      startLongBreak: false,
      longBreak: 10,
      needLongBreak: false,

      //
    };
  },
  getters: {
    getcounter: () => {},
  },
  actions: {
    startPromodorotTimer() {
      this.isCounting = true;
      this.startPromodoro = true;
      const interval = setInterval(() => {
        if (this.promodoro === 0) {
          clearInterval(interval);
          if (this.longBreakIntarval === 0) {
            this.getAlongBreak();
            this.longBreakIntarval = 4;
          } else {
            this.getAshortBreak();
          }
          this.promodoro = 9;
        }
        this.promodoro--;
      }, 1000);
    },
    startShortBreakTimer() {
      this.isCounting = true;
      const interval = setInterval(() => {
        if (this.shortBreak === 0) {
          this.finishedPromodoros++;
          this.longBreakIntarval--;
          this.goToPromodoro();
          clearInterval(interval);
          this.shortBreak = 4;
        }
        this.shortBreak--;
      }, 1000);
    },
    startLongBreakTimer() {
      this.isCounting = true;
      const interval = setInterval(() => {
        if (this.longBreak === 0) {
          clearInterval(interval);
          this.goToPromodoro();
          this.longBreak = 10;
        }
        this.longBreak--;
      }, 1000);
    },
    goToPromodoro() {
      this.stopAll();
      this.startPromodoro = true;
    },
    getAshortBreak() {
      this.stopAll();
      this.startShortBreak = true;
    },
    getAlongBreak() {
      this.stopAll();
      this.startLongBreak = true;
    },
    stopAll() {
      this.startPromodoro =
        this.startShortBreak =
        this.startLongBreak =
        this.isCounting =
          false;
    },
  },
});
