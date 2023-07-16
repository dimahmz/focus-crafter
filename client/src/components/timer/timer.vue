<template lang="pug">
TimerHeader
Timerbody
TimerFooter
</template>
<script setup>
import Timerbody from "./timerbody.vue";
import TimerFooter from "./timerFooter.vue";
import TimerHeader from "./timerHeader.vue";

import { useCounterStore } from "@/stores/timer";
const timerStore = useCounterStore();
</script>

<style scoped></style>
