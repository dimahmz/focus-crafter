<template lang="pug">
a-modal(v-model:visible="settingsStore.showSettingsModal" title="Promodoro settings" )
  .modal
    .times-npts-container
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
      template(#aNpt)
        AppNpt(:nptValue="settingsStore.rounds"
        storeSet="rounds")
    SetNpt(setPhrase="Alarm Music")
      template(#aNpt)
        AppSelectInput(@change="changeAlarmSound")
    SetNpt(setPhrase="Alarm volume")
      template(#aNpt)
          AppRangeNpt(:nptValue="settingsStore.alarmVolume"
            storeSet="alarmVolume"
            @change="chnageAlarmVolume")
    SetNpt(setPhrase="notify me in the last")
      template(#aNpt)
        AppNpt(:nptValue="settingsStore.notifyTime"
          storeSet="notifyTime")
      ChangeAset(storeSet="allowNotification")
  template(#footer)
    a-button(@click="saveSettings()") ok
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
  audio_elem.src = settingsStore.state.selectedAlarm;
  audio_elem.volume = settingsStore.state.alarmVolume / 100;
});

function chnageAlarmVolume() {
  audio_elem.volume = settingsStore.state.alarmVolume / 100;
  audio_elem.play();
}

function changeAlarmSound() {
  audio_elem.src = settingsStore.state.selectedAlarm;
  audio_elem.play();
}
counterStore.$subscribe(
  (mutaion, state) => {
    if (audio_elem.volume > 0 && state.startAlarm) {
      audio_elem.play();
      state.startAlarm = false;
    }
  },
  { detached: true }
);

function saveSettings() {
  settingsStore.showSettingsModal = false;
}
</script>

<style scoped>
.times-npts-container {
  @apply flex justify-between space-x-3 overflow-hidden;
}
</style>
