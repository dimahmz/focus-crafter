const Joi = require("joi");
const AppError = require("../helpers/appErrors");
const Responses = require("../helpers/responses");
const { User } = require("../models/user");
const { log } = require("winston");

module.exports = class TasksServices {
  // update a Task

  static async updateTask(userId, taskIndex, task) {
    const { error } = validate(task);
    if (error)
      throw new AppError(
        "Invalid input error",
        400,
        Responses.create(
          false,
          "Invalid input error",
          error.details[0].message,
          1
        )
      );

    const user = await User.findById(userId);

    if (!user)
      throw new AppError("user nor found", 500, Responses.userNotFound());
    if (!user.tasks[taskIndex]) taskIsNotFound();

    user.tasks[taskIndex] = task;
    user.save();
  }

  static async selectTask(userId, taskIndex) {
    const user = await User.findById(userId);

    if (!user)
      throw new AppError("user nor found", 500, Responses.userNotFound());
    if (!user.tasks[taskIndex]) taskIsNotFound();

    user.tasks.forEach((task) => {
      task.isSelected = false;
    });
    user.tasks[taskIndex].isSelected = true;
    user.save();
  }

  // create a Task
  static async createTask(userId, $task) {
    const user = await User.findById(userId);

    if (!user)
      throw new AppError("user nor found", 500, Responses.userNotFound());

    user.tasks.push($task);

    user.save();
  }

  // delete a Task
  static async deleteTask(userId, taskIndex) {
    const user = await User.findById(userId);

    if (!user)
      throw new AppError("user nor found", 500, Responses.userNotFound());

    if (!user.tasks[taskIndex]) taskIsNotFound();

    user.tasks.splice(taskIndex, 1);

    user.save();
  }
};

// for cleaner code
function taskIsNotFound() {
  throw new AppError(
    "task is not found",
    400,
    Responses.create(
      false,
      "task dosen't exist",
      "the index you sent, doesn't belong to any task!"
    )
  );
}

function clientBadRequest(message) {
  throw new AppError(message, 500, Responses.serverError(message));
}

// validate the task
function validate(task) {
  if (!task) {
    return {
      error: { details: [{ message: "the task object has not been sent" }] },
    };
  }
  const schema = Joi.object({
    title: Joi.string().required(),
    estimatedPomodoros: Joi.number().required(),
    finishedPomodoros: Joi.number().required(),
    isSelected: Joi.boolean().required(),
  });

  return schema.validate(task);
}
