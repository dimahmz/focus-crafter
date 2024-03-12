<template lang="pug">
.flex.flex-col.justify-center.space-y-2
  p.text-center {{ nptLabel }}
  .custom-number-input.h-9.w-28
    .flex.flex-row.w-full.rounded-2xl.relative.mt-1.bg-app-secondary.p-1
      button.h-full.w-16.cursor-pointer.outline-none(@click="decrement")
        span.m-auto.text-2xl.font-semibold &minus;
      input.outline-none.text-center.w-full.font-semibold.text-md.flex.items-center.outline-none(type='number' class='focus:outline-none md:text-basecursor-default' v-model="settingsStore.state.timer[storeSet]" min="1")
      button.h-full.w-16.rounded-r.cursor-pointer(data-action='increment' @click="increment")
        span.m-auto.text-2xl.font-semibold &plus;
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
const props = defineProps({
  nptLabel: { type: String },
  storeSet: { type: String, required: true },
  maxValue: { type: Number },
});

function increment() {
  settingsStore.state.timer[props.storeSet]++;
}
function decrement() {
  settingsStore.state.timer[props.storeSet]--;
}
</script>
<style scoped>
.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
  padding: 5px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
