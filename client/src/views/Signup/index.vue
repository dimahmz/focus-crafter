<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import AppBtn from "@/components/appBtns/appBtn.vue";
import AuthHeader from "@/components/Header.vue";
import LeftSection from "@/components/welcomeSection.vue";
import ResponseModal from "./responseModal.vue";
import SnackBar from "@/components/snackBar.vue";
import { useVuelidate } from "@vuelidate/core";
import {
  minLength,
  required,
  email,
  sameAs,
  helpers,
} from "@vuelidate/validators";

const user = useUserStore();

const initialState = {
  name: "",
  password: "",
  email: "",
  repeat_password: "",
};

const state = reactive({
  ...initialState,
  visible_pass: false,
  visible_confirm_pass: false,
  loading: false,
});

const password = computed(() => state.password);

const rules = {
  name: { required, minLength: minLength(4) },
  password: { required, minLength: minLength(8) },
  email: { email },
  repeat_password: {
    sameAsPassword: helpers.withMessage(
      "Confirm password must be same as password you entered above.",
      sameAs(password)
    ),
  },
};
const v$ = useVuelidate(rules, state);

async function submit() {
  const isStateValid = await v$.value.$validate();
  if (!isStateValid) {
    return;
  }
  state.loading = true;
  await user.registerUser({
    name: state.name,
    password: state.password,
    email: state.email,
    repeat_password: state.repeat_password,
  });
  state.loading = false;
}
</script>

<template lang="pug">
main(class="h-screen flex")
  LeftSection(class="w-11/12 hidden md:flex justify-center items-center")
  section.relative.w-full.px-8.pt-2.pb-4.bg-white
    ResponseModal
    SnackBar
    AuthHeader
    form.mx-auto
      div.flex-column.space-y-1.max-w-lg
        v-text-field(
          v-model='state.name' 
          :error-messages='v$.name.$errors.map(e => e.$message)' 
          label='Name'
          @input='v$.name.$touch' @blur='v$.name.$touch'
          variant="underlined"
          dense=""
          )
        v-text-field(
          v-model='state.email'
          label="email"
          :error-messages='v$.email.$errors.map(e => e.$message)'
          @input='v$.email.$touch' @blur='v$.email.$touch'
          placeholder="Enter your email"
          variant="underlined"
          dense=""
        )
        v-text-field(
          v-model='state.password'
          label="password"
          :error-messages='v$.password.$errors.map(e => e.$message)'
          @input='v$.password.$touch' @blur='v$.password.$touch'
          :append-icon="state.visible_pass ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="state.visible_pass ? 'text' : 'password'"
          placeholder="Enter your password"
          @click:append="state.visible_pass = !state.visible_pass"
          variant="underlined"
          dense=""
        )
        v-text-field(
          dense=""
          v-model='state.repeat_password'
          label="confirm password"
          :error-messages='v$.repeat_password.$errors.map(e => e.$message)'
          @input='v$.repeat_password.$touch' @blur='v$.repeat_password.$touch'
          :append-icon="state.visible_confirm_pass ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="state.visible_confirm_pass ? 'text' : 'password'"
          placeholder="Enter your password"
          @click:append="state.visible_confirm_pass = !state.visible_confirm_pass"
          variant="underlined"
        )
        .flex.justify-between.pt-1
          p Already have an account? &nbsp;
            router-link(:to="{name : 'login'}" class="text-[#00738c]").text-teriary.font-bold Sign in here          
          v-btn.login-btn.uppercase.p-2(:loading="state.loading" :ripple="false" @click="submit") Sign up
</template>

<style scoped>
.login-btn {
  @apply bg-[#373737] text-white h-10 px-5 md:px-10;
}
.signup-btn {
  @apply bg-[#00738c] text-white  h-9 px-5 md:px-10;
}
</style>
