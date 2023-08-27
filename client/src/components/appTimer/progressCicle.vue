<template lang="pug">
section
  .circle-bg
    a-progress(type="circle" :percent="progress")
      template(#format="percent")
        .text-black.text-3xl.font-bold {{ counter }}
  </template>
<script setup>
import { useCounterStore } from "@/stores/timer";
import { watch, ref } from "vue";

const timerStore = useCounterStore();

const props = defineProps({
  counter: { type: String, required: true },
  timing: { type: Number, required: true },
  timerNpt: { type: Number, required: true },
});

const progress = ref(0);

watch(props, () => {
  progress.value = 100 - (props.timing / (props.timerNpt * 60)) * 100;
});
</script>

<style scoped></style>
