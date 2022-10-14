<template lang="pug">
h1 alarm sound
select(v-model="settingStore.selectedAlarm"
       @change="changeAlarm()"
      )
  option(
    v-for="option in settingStore.alarmSound" 
    :value="option.value"
  ) {{ option.text }}
.range
 input(ref="rangeNpt" @change="changeVolume()" type="range" min="0" max="100")
</template>

<script setup>
import { useSettingsStore } from "../../stores/settings";
import { useCounterStore } from "../../stores/timer";
import { onMounted, ref, watch } from "vue";
const settingStore = useSettingsStore();
const counterStore = useCounterStore();

let audio_elem;
onMounted(() => {
  audio_elem = document.createElement("audio");
  audio_elem.src = settingStore.selectedAlarm;
  audio_elem.volume = rangeNpt.value.value / 100;
});

function changeAlarm() {
  audio_elem.src = settingStore.selectedAlarm;
}

const rangeNpt = ref(null);

function changeVolume() {
  audio_elem.volume = rangeNpt.value.value / 100;
  audio_elem.play();
}

watch(counterStore.$state, (state) => {
  if (audio_elem.volume > 0 && state.startAlarm) {
    audio_elem.play();
    state.startAlarm = false;
  }
});
</script>

<style scoped>
.btn-container {
  @apply flex justify-center w-40 space-x-3 mx-auto;
}
</style>
