import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed, reactive } from "vue";
import { useCounterStore } from "./timer";

export const useTasksStore = defineStore("tasks", () => {
  const timerStore = useCounterStore();

  const tasks = [];

  const numberOfTasks = computed(function () {
    return tasks.length;
  });

  function addTask({ title, notes, promodoros }) {
    tasks.push({
      title,
      notes,
      promodoros,
    });
  }

  function editTask(ndx, { title, notes, promodoros }) {
    tasks[ndx].title = title;
    tasks[ndx].notes = notes;
    tasks[ndx].promodoros = promodoros;
  }

  function deleteTask(ndx) {
    this.tasks[ndx].slice(ndx, 1);
  }

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    numberOfTasks,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
