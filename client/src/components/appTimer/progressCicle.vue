<template>
  <div class="m-0 p-0 relative">
    <p
      class="text-5xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      {{ counter }}
    </p>
    <svg
      ref="svg"
      viewBox="-25 -25 250 250"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: rotate(-90deg)"
    >
      <circle
        ref="track_circle"
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        stroke-width="16px"
        stroke-dasharray="565.48px"
        stroke-dashoffset="0"
      ></circle>
      <circle
        ref="progress_circle"
        r="90"
        cx="100"
        cy="100"
        stroke-width="16px"
        stroke-linecap="round"
        fill="transparent"
        stroke-dasharray="628"
        stroke-dashoffset="628"
      ></circle>
    </svg>
  </div>
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

const progress_circle = ref(null);

const track_circle = ref(null);

const svg = ref(null);

watch(props, () => {
  const raduis = +track_circle.value.getAttribute("r");

  progress.value = 100 - (props.timing / (props.timerNpt * 60)) * 100;

  const circumference = 2 * Math.PI * raduis;

  const offset = circumference * ((100 - progress.value) / 100);

  progress_circle.value.style.strokeDashoffset = offset;
  progress_circle.value.style.strokeDasharray = circumference;
});
</script>

<style scoped>
svg {
  @apply w-96 h-96 relative;
}
svg > circle {
}
circle:first-child {
  @apply stroke-secondary;
}

circle:nth-child(2) {
  @apply stroke-tertiary;
}

text {
  @apply text-black text-2xl font-bold;
}
</style>
