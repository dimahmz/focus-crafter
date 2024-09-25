<script setup>
import { useUserStore } from "../stores/user";
import content from "@/content/labels.json";

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
          {{ content.close }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
