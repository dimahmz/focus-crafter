<template lang="pug">
.flex.justify-between
  h2 {{label}}
  a-switch( :checked="settingsStore.state[storeSet]" @click="activateSet" )
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();

const props = defineProps({
  label: { type: String },
  storeSet: { type: String, required: true },
});

function activateSet() {
  settingsStore.state[props.storeSet] = !settingsStore.state[props.storeSet];
}
</script>
