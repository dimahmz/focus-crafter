<template lang="pug">
.modal-container
  .modal
    ModalHeader(modalName="Tasks "
    setStore="showTasksModal")
</template>

<script setup>
import ModalHeader from "../appSettings/modalHeader.vue";
</script>

<style scoped></style>
