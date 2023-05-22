const { User } = require("../models/user");

module.exports = class TasksServices {
  // update a Task
  static async updateTask(userId, taskIndex, task) {
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found!");
    user.task[taskIndex] = task;
    user.save();
    // if the user selected a task
    if (user.task[taskIndex].isSelected == true) {
      user.task.forEach((task, i) => {
        if (i != taskIndex) task.isSelected == false;
      });
      user.save();
    }
  }

  // create a Task
  static async createTask(userId, task) {
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found!");
    user.task.push(task);
    user.save();
  }

  // delete a Task
  static async deleteTask(userId, taskIndex) {
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found!");
    user.task.splice(taskIndex, 1);
    user.save();
  }
};
