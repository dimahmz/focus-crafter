import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, reactive, ref, toRef } from "vue";
import { useSettingsStore } from "./settings";

export const useTasksStore = defineStore("tasks", () => {
  //state
  const settingstore = useSettingsStore();
  const tasks = reactive([
    {
      title: "nodeJs",
      notes: "must work on it",
      estimatedPromodoros: 4,
      finishedPromdoros: 0,
      showEditModal: false,
      isSelected: true,
      isFinished: false,
      displayOptions: false,
    },
    {
      title: "frontProjects",
      notes: "must work on it",
      estimatedPromodoros: 4,
      finishedPromdoros: 0,
      showEditModal: false,
      isSelected: false,
      isFinished: false,
      displayOptions: false,
    },
  ]);
  const selectedTaskNdx = ref(0);
  const addTaskModal = ref(false);
  const editTaskModal = ref(false);

  //getters

  const numberOfTasks = computed(function () {
    const nbrTasks = toRef(tasks, "length");
    return `${nbrTasks.value} tasks`;
  });
  const workingOnTask = computed(function () {
    return tasks.length ? tasks[selectedTaskNdx.value].title : "";
  });
  const workingOnTaskPromodoros = computed(function () {
    return tasks.length
      ? tasks[selectedTaskNdx.value].finishedPromdoros
      : false;
  });
  const estPromodorosRounds = computed(() => {
    if (tasks.length) {
      return (
        tasks[selectedTaskNdx.value].finishedPromdoros %
          settingstore.state.rounds ===
          0 && tasks[selectedTaskNdx.value].finishedPromdoros !== 0
      );
    }
    return false;
  });
  //CRUD

  function addTask({ title, notes, estimatedPromodoros, finishedPromdoros }) {
    tasks.push({
      title,
      notes,
      finishedPromdoros,
      estimatedPromodoros,
      showEditModal: false,
      isSelected: false,
      isFinished: false,
      displayOptions: false,
    });
  }
  function selectTask(ndx) {
    selectedTaskNdx.value = ndx;

    tasks.forEach((task) => {
      if (task.isSelected) {
        task.isSelected = false;
        return;
      }
    });
    tasks[ndx].isSelected = true;
  }
  function editTask(
    ndx,
    { title, notes, estimatedPromodoros, finishedPromdoros }
  ) {
    tasks[ndx].title = title;
    tasks[ndx].notes = notes;
    tasks[ndx].estimatedPromodoros = estimatedPromodoros;
    tasks[ndx].finishedPromdoros = finishedPromdoros;
    tasks[ndx].showEditModal = false;
    tasks[ndx].showEditModal = false;
  }
  function deleteTask(ndx) {
    tasks.splice(ndx, 1);
  }
  function deleteAllTasks() {
    tasks.length = 0;
  }
  function deleteFinishedTasks() {
    tasks.forEach((task, i) => {
      if (task.isFinished) tasks.splice(i, 1);
    });
  }

  //other stores calls
  function updateSelectedTask() {
    const i = selectedTaskNdx.value;
    tasks[i].finishedPromdoros++;
    if (!tasks[i].isFinished)
      tasks[i].isFinished =
        tasks.estPromodorosRounds ||
        tasks[i].finishedPromdoros >= tasks[i].estimatedPromodoros;
  }

  return {
    tasks,
    addTaskModal,
    editTaskModal,
    selectedTaskNdx,
    numberOfTasks,
    workingOnTask,
    workingOnTaskPromodoros,
    estPromodorosRounds,
    addTask,
    editTask,
    deleteTask,
    deleteAllTasks,
    deleteFinishedTasks,
    selectTask,
    updateSelectedTask,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
