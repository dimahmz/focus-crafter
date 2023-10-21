<script setup>
import { reactive, computed, ref } from "vue";
import { useUserStore } from "../../stores/user";
import AppBtn from "../../components/appBtns/appBtn.vue";
import LoginHeader from "./Header.vue";
import LeftSection from "./welcomeSection.vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import SnackBar from "../../components/snackBar.vue";
import ServerError from "ant-design-vue/es/result/serverError";

const user = useUserStore();

const initialState = {
  name: "",
  password: "",
  rememberUser: null,
  visible: true,
};

const state = reactive({
  ...initialState,
  loading: false,
});

const rules = {
  name: { required, minLength: minLength(4) },
  password: { required, minLength: minLength(8) },
};
const v$ = useVuelidate(rules, state);

async function submit() {
  const isStateValid = await v$.value.$validate();
  if (!isStateValid) {
    return;
  }
  state.loading = true;
  await user.loginUser(
    { name: state.name, password: state.password },
    state.rememberUser
  );
  state.loading = false;

  if (!user.state.serverResponse.success) user.state.openSnackbar = true;
}
</script>

<template lang="pug">
main(class="h-screen flex")
  LeftSection(class="w-11/12 hidden md:flex justify-center items-center")
  section.relative.w-full.px-8.py-6.bg-white
    SnackBar
    LoginHeader
    form
      div.flex-column.space-y-4.max-w-lg
        v-text-field(
          v-model='state.name' 
          :error-messages='v$.name.$errors.map(e => e.$message)' 
          label='Name'
          required='' 
          @input='v$.name.$touch' @blur='v$.name.$touch'
          variant="underlined"
          )
        v-text-field(
          v-model='state.password'
          label="password"
          :error-messages='v$.password.$errors.map(e => e.$message)'
          @input='v$.name.$touch' @blur='v$.name.$touch'
          :append-icon="state.visible ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="state.visible ? 'text' : 'password'"
          placeholder="Enter your password"
          @click:append="state.visible = !state.visible"
          variant="underlined"
        )
      .flex-column.space-y-4
        v-checkbox( v-model="state.rememberUser" label="remeber password" hide-details)
        div(class="flex flex-col space-y-7 xs:flex-row xs:space-y-0 xs:space-x-10  items-center")
          v-btn.login-btn(:loading="state.loading" :ripple="false" @click="submit") LOGIN
          v-btn.signup-btn(:ripple="false") CREATE AN ACCOUNT
            router-link(:to="{name : 'signup'}")
        p Forgot password? &nbsp;
          router-link(:to="{name : 'home'}")(class="text-[#00738c]").text-teriary.font-bold Reset here
</template>

<style scoped>
.login-btn {
  @apply bg-[#373737] text-white h-11 px-5 md:px-10;
}
.signup-btn {
  @apply bg-[#00738c] text-white  h-11 px-5 md:px-10;
}
</style>
