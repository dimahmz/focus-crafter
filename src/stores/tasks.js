import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, reactive, ref } from "vue";
import { useCounterStore } from "./timer";

export const useTasksStore = defineStore("tasks", () => {
  const timerStore = useCounterStore();

  const tasks = reactive({ value: [] });
  const selectedTaskNdx = ref(0);

  const numberOfTasks = computed(function () {
    return tasks.value.length;
  });

  function addTask({ title, notes, estimatedPromodoros, finishedPromdoros }) {
    tasks.value.push({
      title,
      notes,
      finishedPromdoros,
      estimatedPromodoros,
      isSelected: false,
    });
  }
  function selectTask(ndx) {
    selectedTaskNdx.value = ndx;

    tasks.value.forEach((task) => {
      if (task.isSelected) {
        task.isSelected = false;
        return;
      }
    });
    tasks.value[ndx].isSelected = true;
  }
  function editTask(
    ndx,
    { title, notes, estimatedPromodoros, finishedPromdoros }
  ) {
    tasks[ndx].value.title = title;
    tasks[ndx].value.notes = notes;
    tasks[ndx].value.estimatedPromodoros = estimatedPromodoros;
    tasks[ndx].value.finishedPromdoros = finishedPromdoros;
  }

  function deleteTask(ndx) {
    tasks.value.splice(ndx, 1);
  }

  return {
    selectedTaskNdx,
    tasks,
    addTask,
    editTask,
    deleteTask,
    numberOfTasks,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
