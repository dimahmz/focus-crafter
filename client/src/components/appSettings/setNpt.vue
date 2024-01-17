<template lang="pug">
.flex.justify-between.items-center
  h2 {{label}}
  .flex.space-x-3
    slot(name="aNpt")
    slot
</template>

<script setup>
defineProps({
  label: { type: String },
});
</script>
