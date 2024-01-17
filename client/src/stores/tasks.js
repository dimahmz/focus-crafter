import { defineStore } from "pinia";
import { computed, reactive, ref, toRef } from "vue";
import { useSettingsStore } from "./settings";
import { useUserStore } from "./user";
import axios from "../plugins/axiosConfig";
import _axios from "@/api/index";
import { successResponse } from "@/content/errors";

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
      settingStore.state.timer.rounds
    }`;
  });

  // get the total minutes left to work on in a selected task
  const tasktotalMinutes = computed(() => {
    if (selectedTaskNdx.value < 0 || tasks.length == 0) return "";
    return (
      settingStore.state.timer.pomodoro_npt *
      tasks[selectedTaskNdx.value].completedPomodoros
    );
  });

  /* ----Methods---- */

  //CRUD operations

  // Add Task
  async function addTask(task) {
    let response = successResponse;
    if (userStore.state.loggedIn)
      response = await axios.post("/editTasks/createTask", { task });
    tasks.push(task);
    return response;
  }
  // Delete Task
  async function deleteTask(ndx) {
    tasks.splice(ndx, 1);
    if (ndx == selectedTaskNdx.value) selectedTaskNdx.value = -1;
    if (userStore.state.loggedIn)
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
    if (userStore.state.loggedIn) {
      axios.put("/editTasks/selectTask", {
        taskIndex: ndx,
      });
    }
  }

  // sync tasks settings with the Database
  function syncTasksWithDB($tasks) {
    $tasks.forEach((task, i) => {
      if (task.isSelected) selectedTaskNdx.value = i;
      if (task) {
        tasks.push(task);
      }
      // @todo
      // remove the _id from each task
    });
  }

  //updates the selected tasks when a pomodoro session has been completed
  function incrementTaskPomodro() {
    const i = selectedTaskNdx.value;
    if (i < 0 || tasks.length == 0) return;
    tasks[i].finishedPomodoros++;
    if (userStore.state.loggedIn) {
      axios.put("/editTasks/updateTask", {
        taskIndex: i,
        task: tasks[i],
      });
    }
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
    incrementTaskPomodro,
    syncTasksWithDB,
    hideAll,
  };
});
