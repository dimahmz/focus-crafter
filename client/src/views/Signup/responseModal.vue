<script setup>
import { useUserStore } from "../../stores/user";
const user = useUserStore();
const isActive = user.state.openRegistrationModal;
</script>
<template>
  <v-dialog v-model="user.state.openRegistrationModal" width="500">
    <v-card title="Account has been created">
      <v-card-text>
        {{ user.state.serverResponse.description }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'login' }">
          <v-btn
            text="OK"
            @click="user.state.openRegistrationModal = false"
          ></v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
