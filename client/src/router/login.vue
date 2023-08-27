<template>
  <div class="container">
    <div class="form">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="name"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.name">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.rememberUser"
              >Remember me</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <router-link to="/signup">register now!</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const formState = reactive({
  name: "best",
  password: "best12345",
  rememberUser: true,
});

const router = useRouter();

const onFinish = async (values) => {
  const user = useUserStore();
  const response = await user.loginUser(
    { name: formState.name, password: formState.password },
    formState.rememberUser
  );
  console.log(response);
};
const disabled = computed(() => {
  return !(formState.name && formState.password);
});
</script>
<style scoped>
.container {
  @apply h-screen grid place-items-center;
}
.form {
  max-width: 800px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
