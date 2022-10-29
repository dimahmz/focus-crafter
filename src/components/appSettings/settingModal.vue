<template lang="pug">
.modal-container
  .modal
    mHeader(modalName="Promodoro settings"
    setStore="showSettingsModal")
    .Times-container
      AppNpt(nptLabel="promodoro"   storeSet="promodoro_npt")
      AppNpt(nptLabel="short break" storeSet="shortBreak_npt")
      AppNpt(nptLabel="long break" storeSet="longBreak_npt")
    ChangeAset(
        setPhrase="auto start break"
        storeSet="autoStartBreaks")
    ChangeAset(
        setPhrase="auto start Promodors"
        storeSet="autoStartPromodoros")
    ChangeAset(
        setPhrase="Dark mode when running"
        storeSet="focusedMode")
    SetNpt(setPhrase="Long Break Interval")
      template(#npt)
        AppNpt(:nptValue="settingsStore.rounds"
        storeSet="rounds")
    SetNpt(setPhrase="Alarm")
      template(#range-npt)
        AppRangeNpt(:nptValue="settingsStore.alarmVolume"
        storeSet="alarmVolume"
        @change="chnageAlarmVolume")
      template(#select)
        AppSelectInput(@change="changeAlarmSound")
    SetNpt(setPhrase="notify me in the last")
      template(#npt)
          AppNpt(:nptValue="settingsStore.notifyTime"
          storeSet="notifyTime")
      template(#switchBtn)
        ChangeAset(storeSet="allowNotification")
    

</template>

<script setup>
import mHeader from "./modalHeader.vue";
import SetNpt from "./setNpt.vue";
import AppNpt from "../appNpt.vue";
import AppRangeNpt from "../appRangeNpt.vue";
import ChangeAset from "./changeAset.vue";
import AppSelectInput from "../appSelectInput.vue";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";
import { onMounted } from "vue";

const counterStore = useCounterStore();
const settingsStore = useSettingsStore();

let audio_elem;
onMounted(() => {
  audio_elem = document.createElement("audio");
  audio_elem.src = settingsStore.selectedAlarm;
  audio_elem.volume = settingsStore.alarmVolume / 100;
});

function chnageAlarmVolume() {
  audio_elem.volume = settingsStore.alarmVolume / 100;
  audio_elem.play();
}

function changeAlarmSound() {
  audio_elem.src = settingsStore.selectedAlarm;
  audio_elem.play();
}
counterStore.$subscribe(
  (mutaion, state) => {
    if (audio_elem.volume > 0 && state.startAlarm) {
      audio_elem.play();
      state.startAlarm = false;
      // console.log(mutaion.type);
    }
  },
  { detached: true }
);
</script>

<style scoped>
.modal-container {
  @apply w-full h-full absolute inset-0 p-4;
}
.modal {
  @apply relative max-w-xl bg-slate-300;
  z-index: 999;
}

.Times-container {
  @apply flex justify-between space-x-3 overflow-hidden;
}
</style>
