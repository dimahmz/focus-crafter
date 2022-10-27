<template lang="pug">
section
  h2 {{setPhrase}}
  .switchBtn
    .circle( @click="activateSet" :class="{ active : settingsStore[storeSet] }" )
  hr
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();

const props = defineProps({
  setPhrase: { type: String },
  storeSet: { type: String, required: true },
});

function activateSet(e) {
  const isActive = e.target.classList.toggle("active");
  settingsStore[props.storeSet] = isActive;
}
</script>

<style scoped>
section {
  @apply flex justify-between py-5;
}
.switchBtn {
  @apply relative w-20 h-10 p-1 rounded-2xl bg-red-400;
}
.circle {
  @apply relative w-1/2 h-full bg-darkBlue rounded-xl z-10;
}
.active {
  @apply transition-all translate-x-full bg-green-400;
}
</style>
