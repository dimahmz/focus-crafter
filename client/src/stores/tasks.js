import { defineStore } from "pinia";
import { computed, reactive, ref, toRef } from "vue";
import { useSettingsStore } from "./settings";
import { useUserStore } from "./user";
import axios from "../plugins/axiosConfig";
import _axios from "@/api/index";

export const useTasksStore = defineStore("tasks", () => {
  // other stores
  const settingStore = useSettingsStore();
  const userStore = useUserStore();
  //state
  const tasks = reactive([]);

  // properties used ony in the client side
  const selectedTaskNdx = ref(-1);
  const addNewTaskModal = ref(false);
  const taskListMobile = ref(false);
  const editTaskModal = ref(false);

  /* ----Getters---- */

  // get the total numbers of taks
  const numberOfTasks = computed(function () {
    const tasksTotal = toRef(tasks, "length");
    return tasksTotal.value;
  });

  // get the selected task
  const workingOnTask = computed(function () {
    if (selectedTaskNdx.value < 0 || numberOfTasks == 0) return "";
    if (tasks.length > 0) return tasks[selectedTaskNdx.value].title;
    return "";
  });

  // get completed rounds of pomodoros of a selected task
  const workingOnTaskPomodoros = computed(function () {
    if (selectedTaskNdx.value < 0 || tasks.length == 0) return "";
    return `${tasks[selectedTaskNdx.value].completedPomodoros} / ${
      settingStore.state.rounds
    }`;
  });

  // get the total minutes left to work on in a selected task
  const tasktotalMinutes = computed(() => {
    if (selectedTaskNdx.value < 0 || tasks.length == 0) return "";
    return (
      settingStore.state.promodoro_npt *
      tasks[selectedTaskNdx.value].completedPomodoros
    );
  });

  /* ----Methods---- */

  //CRUD operations

  // Add Task
  async function addTask(task) {
    const response = await axios.post("/editTasks/createTask", { task });
    tasks.push(task);
    return response;
  }
  // Delete Task
  async function deleteTask(ndx) {
    tasks.splice(ndx, 1);
    if (ndx == selectedTaskNdx.value) selectedTaskNdx.value = -1;
    axios.delete("/editTasks/deleteTask", {
      data: {
        taskIndex: ndx,
      },
    });
  }
  // select Task
  function selectTask(ndx) {
    selectedTaskNdx.value = ndx;
    tasks.forEach((task) => (task.isSelected = false));
    tasks[ndx].isSelected = true;
  }

  // sync tasks settings with the Database
  function syncTasksWithDB($tasks) {
    $tasks.forEach((task) => {
      if (task) {
        tasks.push(task);
      }
      // @todo
      // remove the _id from each task
    });
  }

  //updates the selected tasks when a pomodoro session has been completed
  function updateSelectedTask() {
    const i = selectedTaskNdx.value;
    if (i < 0 || tasks.length == 0) return;
    tasks[i].finishedPomdoros++;
    const isFinished = tasks[i].finishedPomdoros >= tasks[i].estimatedPomodoros;
    tasks[i].isFinished = isFinished;
  }

  // hide all modals
  function hideAll() {
    tasks.addNewTaskModal = false;
    tasks.forEach((task) => {
      task.displayOptions = task.showEditModal = false;
    });
  }

  return {
    tasks,
    addNewTaskModal,
    taskListMobile,
    editTaskModal,
    selectedTaskNdx,
    numberOfTasks,
    workingOnTask,
    workingOnTaskPomodoros,
    tasktotalMinutes,
    addTask,
    deleteTask,
    selectTask,
    updateSelectedTask,
    syncTasksWithDB,
    hideAll,
  };
});
