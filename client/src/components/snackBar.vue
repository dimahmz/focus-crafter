<script setup>
import { useUserStore } from "../stores/user";
const user = useUserStore();
</script>
<template>
  <div class="text-center">
    <v-snackbar
      v-model="user.state.openSnackbar"
      multi-line
      location="top"
      style="margin-top: 30px"
      :timeout="-1"
    >
      {{ user.state.serverResponse.title }} <br />
      {{ user.state.serverResponse.description }}
      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="user.state.openSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
