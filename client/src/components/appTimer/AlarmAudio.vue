<script setup>
import { computed, watch, ref, onMounted } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const counterStore = useCounterStore();
const settingsStore = useSettingsStore();

let audioElement = ref(null);

onMounted(() => {
  audioElement.value = document.createElement("audio");
  audioElement.value.src = settingsStore.state.timer.selectedAlarm;
  audioElement.value.volume = settingsStore.state.timer.alarmVolume;
});

const newAlarmSound = computed(() => settingsStore.state.timer.selectedAlarm);
const changeVolume = computed(() => settingsStore.state.timer.alarmVolume);
const startAlarm = computed(() => counterStore.startAlarm);

watch(newAlarmSound, (newAlarm) => {
  audioElement.value.src = newAlarm;
  audioElement.value.play();
});

watch(changeVolume, (newSound) => {
  audioElement.value.volume = newSound;
  audioElement.value.play();
});

watch(startAlarm, () => {
  if (startAlarm) {
    audioElement.value.play();
    counterStore.startAlarm = false;
  }
});
</script>
