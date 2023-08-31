import { defineStore } from "pinia";
import { computed, reactive, ref, toRef } from "vue";
import { useSettingsStore } from "./settings";
import { useUserStore } from "./user";
import axios from "../plugins/axiosConfig";

export const useTasksStore = defineStore("tasks", () => {
  // other stores
  const settingStore = useSettingsStore();
  const userStore = useUserStore();

  //state
  const tasks = reactive([]);
  // taskObj
  // {
  // displayOptions:false
  // estimatedPromodoros:4
  // finishedPromdoros:0
  // isFinished:false
  // isSelected:false
  // notes:" test"
  // showEditModal:false
  // title:"test"
  // addNewTaskModal:false
  // editTaskModal:false
  // selectedTaskNdx:-1
  // }

  // properties used ony in the client side
  const selectedTaskNdx = ref(-1);
  const addNewTaskModal = ref(false);
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
  function addTask(task) {
    // add it to DB
    UpdateTaskInDB(task, true, false, null);
    task.showEditModal = false;
    task.displayOptions = false;
    tasks.push(task);
  }

  // select a Task
  function selectTask(ndx) {
    selectedTaskNdx.value = ndx;
    tasks.forEach((task) => (task.isSelected = false));
    tasks[ndx].isSelected = true;
    // @update the selected task in the database
  }

  // Update a Task
  function editTask(
    ndx,
    { title, notes, estimatedPromodoros, finishedPromdoros }
  ) {
    tasks[ndx].title = title;
    tasks[ndx].notes = notes;
    tasks[ndx].estimatedPromodoros = estimatedPromodoros;
    tasks[ndx].finishedPromdoros = finishedPromdoros;
    tasks[ndx].showEditModal = false;
    // update it in DB
    UpdateTaskInDB(tasks[ndx], false, true, ndx);
  }

  // Delete Task
  function deleteTask(ndx) {
    if (ndx == selectedTaskNdx.value) selectedTaskNdx.value = -1;
    tasks.splice(ndx, 1);
    // update it in DB
    UpdateTaskInDB(null, false, false, ndx);
  }

  // sync tasks settings with the Database
  function syncTasksWithDB($tasks) {
    $tasks.forEach((task) => {
      if (task) {
        task.displayOptions = task.showEditModal = false;
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
    tasks[i].finishedPromdoros++;
    const isFinished =
      tasks[i].finishedPromdoros >= tasks[i].estimatedPromodoros;
    tasks[i].isFinished = isFinished;
  }

  // hide all modals
  function hideAll() {
    tasks.addNewTaskModal = false;
    tasks.forEach((task) => {
      task.displayOptions = task.showEditModal = false;
    });
  }

  // Update or Add or delete a task in the DataBase
  function UpdateTaskInDB($task, addIt, updateIt, taskIndex) {
    if (userStore.state.loggedIn) {
      // Delete a task
      if (!(addIt || updateIt)) {
        // Data object is required in axios' delete method
        axios.delete("/editTasks/deleteTask", {
          data: {
            taskIndex: taskIndex,
          },
        });
        return;
      }
      const task = {
        title: $task.title,
        notes: $task.notes,
        estimatedPromodoros: $task.estimatedPromodoros,
        finishedPromdoros: $task.finishedPromdoros,
        isFinished: $task.isFinished,
      };
      // add Task
      if (addIt) {
        axios.post("/editTasks/createTask", {
          task,
        });
      }
      // update Task
      else {
        axios.put("/editTasks/updateTask", {
          task,
          taskIndex,
        });
        return;
      }
    }
  }

  return {
    tasks,
    addNewTaskModal,
    editTaskModal,
    selectedTaskNdx,
    numberOfTasks,
    workingOnTask,
    workingOnTaskPomodoros,
    tasktotalMinutes,
    addTask,
    editTask,
    deleteTask,
    selectTask,
    updateSelectedTask,
    syncTasksWithDB,
    hideAll,
    UpdateTaskInDB,
  };
});
