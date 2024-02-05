<template lang="pug">
v-dialog(v-model='addNewTaskModal' width='400px')
  form(@submit="addNewTask")
    v-card(title="Add task")
      v-alert(v-model="openAlert" type="success" closable close-label="Close Alert" 
        title="Task has been added"
      )
      .card-body
        .text-npt-container
          v-text-field(
            variant="outlined"
            v-model="state.title"
            :error-messages='v$.title.$errors.map(e => e.$message)' 
            placeholder="e.g : Reading a book" label="Task name"
          )
        .number-npt-container
          label Rounds
          v-text-field(
            type="number"
            v-model="state.estimatedPomodoros" 
            min="1" variant="outlined" 
            name="estimatedPomodoros"
            :error-messages='v$.estimatedPomodoros.$errors.map(e => e.$message)' 
          )
      v-card-actions
        v-btn( variant="tonal" @click='addNewTaskModal = false') Cancel
        v-btn.create-btn( variant="tonal" type="submit" :loading="loading") Create
</template>
<script setup>
import { ref, reactive, nextTick } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { maxLength, required, numeric } from "@vuelidate/validators";

const { addNewTaskModal } = storeToRefs(useTasksStore());

const loading = ref(false),
  openAlert = ref(false);

const TasksStore = useTasksStore();

const initialState = {
  title: "",
  estimatedPomodoros: 4,
};

let state = reactive({
  title: "",
  estimatedPomodoros: 4,
});

const rules = {
  title: { required, maxLength: maxLength(50) },
  estimatedPomodoros: { required, numeric },
};
const v$ = useVuelidate(rules, state);

async function addNewTask(e) {
  e.preventDefault();
  const isStateValid = await v$.value.$validate();
  if (!isStateValid) {
    return;
  }

  const task = {
    title: state.title,
    estimatedPomodoros: state.estimatedPomodoros,
    finishedPomodoros: 0,
    isSelected: false,
  };
  loading.value = true;
  const resp = await TasksStore.addTask(task);
  if (resp.success) {
    openAlert.value = true;
    state = {
      ...initialState,
    };
    // not working
    // await nextTick();
    // v$.value.$reset();
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.v-dialog {
  @apply max-w-lg;
  .v-card {
    @apply text-center;
    .v-card-title {
      @apply text-6xl font-semibold;
    }
    .card-body {
      @apply my-10 flex-column space-y-3 px-6;
    }
    .text-npt-container {
      @apply mx-auto w-full;
    }
    .number-npt-container {
      @apply flex-center-between space-x-4;
      .v-text-field {
        @apply w-[40px];
      }
    }
    .v-card-actions {
      @apply w-full mb-5 flex-center-between px-16;
      .v-btn {
        @apply px-6;
      }
      .create-btn {
        @apply bg-app-tertiary text-white;
      }
    }
  }
}
</style>
