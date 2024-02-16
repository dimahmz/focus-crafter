<script setup>
import { reactive } from "vue";
import { useUserStore } from "../../stores/user";
import axios from "../../plugins/axiosConfig";
import _ from "loadsh";
import SnackBar from "../../components/snackBar.vue";
import makeRequest from "../../api";

const user = useUserStore();

const state = reactive({
  email: "",
  feedBack: "",
  loading: false,
  isFeedBackSent: false,
});

async function sendFeedBack(e) {
  e.preventDefault();
  state.loading = true;
  if (user.state.loggedIn) {
    state.email = user.state.email;
  }
  const response = await makeRequest("/feed-back", "post", {
    email: state.email,
    text: state.feedBack,
  });
  state.loading = false;
  if (response.success) state.isFeedBackSent = true;
}
</script>

<template lang="pug">
section.my-16
  SnackBar
  .max-w-lg.px-8.mx-auto( v-if="state.isFeedBackSent")
    v-alert(type="success" title="Thank you for your feed back"
    text="Your feed back has been sent successfully,")
  .max-w-sm.px-4.mx-auto(v-else)
    form(@submit="sendFeedBack").flex-column.space-y-4
      h1.font-seconadry.text-xl.font-semibold Give us your feedback!
      p(class="text-[#87898E]") Let us know how we can improve this app 
      v-text-field(v-if="!user.state.loggedIn" v-model="state.email" type="email" variant="outlined" label="Your email")
      v-textarea(v-model="state.feedBack" required label="Your feed-back"  variant="outlined")
      .flex-center
        v-btn.w-full(max-width="200" :loading="state.loading" :ripple="false" variant="tonal" type="submit") send
</template>
