import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, reactive, ref } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = reactive({
    value: [
      {
        title: "nodeJs",
        notes: "must work on it",
        estimatedPromodoros: 4,
        finishedPromdoros: 1,
        showEditModal: false,
        isSelected: true,
      },
      {
        title: "frontProjects",
        notes: "must work on it",
        estimatedPromodoros: 4,
        finishedPromdoros: 1,
        showEditModal: false,
        isSelected: false,
      },
    ],
  });
  const selectedTaskNdx = ref(0);
  const addTaskModal = ref(false);
  const editTaskModal = ref(false);

  const numberOfTasks = computed(function () {
    return tasks.value.length;
  });

  function addTask({ title, notes, estimatedPromodoros, finishedPromdoros }) {
    tasks.value.push({
      title,
      notes,
      finishedPromdoros,
      estimatedPromodoros,
      showEditModal: false,
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
    tasks.value[ndx].title = title;
    tasks.value[ndx].notes = notes;
    tasks.value[ndx].estimatedPromodoros = estimatedPromodoros;
    tasks.value[ndx].finishedPromdoros = finishedPromdoros;
    tasks.value[ndx].showEditModal = false;
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
    selectTask,
    addTaskModal,
    editTaskModal,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
