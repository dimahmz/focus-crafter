<template lang="pug">
audio.hidden(ref="alarm" :src="settingsStore.timer.selectedAlarm" :volume="settingsStore.state.timer.alarmVolume")
</template>
<script setup>
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const counterStore = useCounterStore();
const settingsStore = useSettingsStore();

const alarm = ref(null);

counterStore.$subscribe(
  (mutaion, state) => {
    if (alarm.value.volume > 0 && state.startAlarm) {
      alarm.value.play();
      state.startAlarm = false;
    }
  },
  { detached: true }
);
</script>
