<template lang="pug">
.header page not found
RouterLink(:to="{ name : 'home' }" @click="logout")
  button back to home
</template>
    
<script setup>
</script>
  
<style scoped>
.header {
  @apply mt-4 mb-10;
}
.timerBtns {
  @apply mb-16;
}
</style>
  