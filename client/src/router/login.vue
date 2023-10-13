<template lang="pug">
main(class="max-w-[1500px] flex")
  section.w-full(class="hidden md:flex justify-between items-center text-white")
    img(src="startLogo.png", alt="Vortex focus")
  section.w-full.h-screen.px-8.py-10.bg-white
    header.w-full.text-center.flec-column
      div(class="flex md:justify-end")
        router-link(:to="{name : 'home'}")
          img.w-16(src="logo.png")
      div
        h1 Good Afternoon
        p Focus on being productive instead of busy.
    v-form
    h2 Sing In
      v-text-field(
        label="name"
        placeholder="enter name"
        variant="underlined"
        v-model='formState.name'
      )
      v-text-field(
        label="password"
        :append-icon="formState.visible ? 'mdi-eye' : 'mdi-eye-off'" 
        :type="formState.visible ? 'text' : 'password'"
        placeholder="Enter your password"
        variant="underlined"
        v-model='formState.password'
        @click:append="formState.visible = !formState.visible"
      )
      v-checkbox(value="q" label="remeber password" hide-details)
      AppBtn(label="LOGIN")    
      AppBtn.mb-12(label="CREATE AN ACCOUNT")
        router-link(:to="{name : 'signup'}")
      p Forgot password? &nbsp;
        router-link(:to="{name : 'home'}").text-teriary.font-bold Reset here
      p Don't HAve an account?
</template>
<script setup>
import { reactive, computed, ref } from "vue";
import { useUserStore } from "../stores/user";
import AppBtn from "../components/appBtns/appBtn.vue";

const formState = reactive({
  name: "best",
  password: "best12345",
  rememberUser: true,
  visible: false,
});

const errorMsg = ref(false);
const errorModal = ref(false);
const modalMsg = reactive({});

const onFinish = async (values) => {
  errorMsg.value = false;
  const user = useUserStore();
  const response = await user.loginUser(
    { name: formState.name, password: formState.password },
    formState.rememberUser
  );
  if (response?.success == false) {
    if (response.errolevel == 3) {
      modalMsg.title = response.title;
      modalMsg.description = reponse.description;
    } else errorMsg.value = response.description;
  }
};
const disabled = computed(() => {
  return !(formState.name && formState.password);
});
</script>
<style scoped></style>
