<template lang="pug">
.flex.justify-between.align-center
  h2 {{label}}
  .switch_btn(:class="{ active_timer : settingsStore.state.timer[storeSet] }")
    v-switch(v-model="settingsStore.state.timer[storeSet]" hide-details inset)
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();

const props = defineProps({
  label: { type: String },
  storeSet: { type: String, required: true },
});

function activateSet() {
  settingsStore.state.timer[props.storeSet] =
    !settingsStore.state.timer[props.storeSet];
}
</script>

<style lang="scss">
.active_timer {
  .v-switch__track {
    @apply bg-app-tertiary;
  }
}
</style>
