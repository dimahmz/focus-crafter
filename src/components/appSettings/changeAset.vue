<template lang="pug">
section
  h2 {{setPhrase}}
  a-switch( :checked="settingsStore.state[storeSet]" @click="activateSet" )
  hr
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();

const props = defineProps({
  setPhrase: { type: String },
  storeSet: { type: String, required: true },
});

function activateSet() {
  settingsStore.state[props.storeSet] = !settingsStore.state[props.storeSet];
}
</script>

<style scoped>
section {
  @apply flex justify-between py-5;
}
</style>
