<template lang="pug">
.flex.flex-col.space-y-2
  label(for="inputNumber") {{ nptLabel }}
  .custom-number-input.h-10.w-32
    .flex.flex-row.w-full.rounded-2xl.relative.mt-1.bg-secondary
      button.h-full.w-20.cursor-pointer.outline-none(@click="decrement")
        span.m-auto.text-2xl.font-semibold &minus;
      input.outline-none.text-center.w-full.font-semibold.text-md.flex.items-center.outline-none(type='number' class='focus:outline-none md:text-basecursor-default' v-model="settingsStore.state[storeSet]" min="1")
      button.h-full.w-20.rounded-r.cursor-pointer(data-action='increment' @click="increment")
        span.m-auto.text-2xl.font-semibold &plus;
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
import { ref } from "vue";
const settingsStore = useSettingsStore();
const props = defineProps({
  nptLabel: { type: String },
  storeSet: { type: String, required: true },
  maxValue: { type: Number },
});

function increment() {
  settingsStore.state[props.storeSet]++;
}
function decrement() {
  settingsStore.state[props.storeSet]--;
}
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>
