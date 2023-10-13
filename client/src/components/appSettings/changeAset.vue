<template lang="pug">
.flex.justify-between
  h2 {{label}}
  label(class="toggle")
    input(class="toggle-checkbox" type="checkbox" :checked="settingsStore.state[storeSet]" @click="activateSet")
    div(class="toggle-switch")
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

<style scoped>
.toggle {
  cursor: pointer;
  display: inline-block;
}

.toggle-switch {
  @apply bg-app-secondary;
  display: inline-block;
  border-radius: 16px;
  width: 50px;
  height: 26px;
  position: relative;
  vertical-align: middle;
  transition: background 0.25s;
}
.toggle-switch:before,
.toggle-switch:after {
  content: "";
}
.toggle-switch:before {
  @apply bg-app-quaternary;
  display: block;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
  width: 18px;
  height: 18px;
  position: absolute;
  top: 4px;
  left: 3px;
  transition: left 0.25s;
}
.toggle-checkbox:checked + .toggle-switch {
  @apply bg-app-tertiary;
}
.toggle-checkbox:checked + .toggle-switch:before {
  left: 27px;
  @apply bg-app-secondary;
}

.toggle-checkbox {
  position: absolute;
  visibility: hidden;
}
</style>
