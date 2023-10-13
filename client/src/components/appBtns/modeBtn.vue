<template lang="pug">
label.switch
  input#input(type='checkbox' checked=false @click='changeTheme')
  span.slider.round  
</template>

<script setup>
function changeTheme() {
  document.documentElement.classList.toggle("dark");
}
</script>

<style scoped></style>
