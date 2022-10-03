import { defineStore, acceptHMRUpdate } from "pinia";
// import { ref } from "vue";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      needToChange: false,
      timerCountingIs: "promodro",
      longBreakIntarval: 4,
      //
      confirmChange: false,
      TimerIsCounting: false,
      //
      displayModel: false,
      confirmChange: false,
      //
      todoPromodoros: 4,
      startPromodoro: true,
      promodoro: 90,
      finishedPromodoros: 0,
      //
      startShortBreak: false,
      shortBreak: 40,
      //
      startLongBreak: false,
      longBreak: 100,
      needLongBreak: false,
      //
    };
  },
  getters: {
    getcounter: () => {},
  },
  actions: {
    startPromodorotTimer() {
      this.TimerIsCounting = this.startPromodoro = true;
      this.timerCountingIs = "promodoro";
      const interval = setInterval(() => {
        if (this.needToChange) {
          clearInterval(interval);
          return;
        }
        if (this.promodoro === 0 || !this.startPromodoro) {
          clearInterval(interval);
          this.finishedPromodoros++;
          if (this.finishedPromodoros % this.longBreakIntarval === 0) {
            this.getAlongBreak();
            this.longBreakIntarval = 4;
          } else this.getAshortBreak();
          this.promodoro = 9;
        }
        this.promodoro--;
      }, 1000);
    },
    startShortBreakTimer() {
      this.TimerIsCounting = true;
      this.timerCountingIs = "shortBreak";
      const interval = setInterval(() => {
        if (this.needToChange) {
          clearInterval(interval);
          return;
        }
        if (this.shortBreak === 0 || !this.startShortBreak) {
          this.goToPromodoro();
          clearInterval(interval);
          this.shortBreak = 4;
        }
        this.shortBreak--;
      }, 1000);
    },
    startLongBreakTimer() {
      this.TimerIsCounting = true;
      this.timerCountingIs = "longBreak";
      const interval = setInterval(() => {
        if (this.needToChange) {
          clearInterval(interval);
          return;
        }
        if (this.longBreak === 0 || !this.startLongBreak) {
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
    changeToAnewPhase() {
      this.displayModel = true;
      this.needToChange = true;
    },
    needBreakConfirm(confirm) {
      if (this.timerCountingIs === "promodoro") {
        if (confirm) this.promodoro = 0;
        this.startPromodorotTimer();
      } else if (this.timerCountingIs === "shortBreak") {
        if (confirm) this.shortBreak = 0;
        this.startShortBreakTimer();
      } else {
        if (confirm) this.longBreak = 0;
        this.startLongBreakTimer();
      }
      this.needToChange = this.displayModel = false;
    },
    getAlongBreak() {
      this.stopAll();
      this.startLongBreak = true;
    },
    stopAll() {
      this.startPromodoro =
        this.startShortBreak =
        this.startLongBreak =
        this.TimerIsCounting =
          false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
