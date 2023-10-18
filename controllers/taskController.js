const taskModel = require("../models/taskModel");

// POST || Add the task

exports.addTaskController = async (req, res) => {
  try {
    const { title, description, date, userId } = req.body;

    // Validation
    if (!title || !description || !date || !userId) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the details",
      });
    }

    const task = new taskModel({ title, description, date, userId });
    await task.save();

    return res.status(201).send({
      success: true,
      message: "New user created",
      task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in register callback",
      error,
    });
  }
};

// GET || Get all the Task

exports.getAllTaskController = async (req, res) => {
  try {
    const task = await taskModel.find({});
    if (!task) {
      return res.status(200).send({
        success: false,
        message: "No task is find",
      });
    }

    return res.status(200).send({
      success: true,
      message: "All blogs are find",
      task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in register callback",
      error,
    });
  }
};

// Del || Delete the task

exports.deleteTaskController = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(200).send({
        success: false,
        message: "Task is not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Task is deleted",
      task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in register callback",
      error,
    });
  }
};

// Update || Update a task

exports.updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, userId } = req.body;
    const task = await taskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        userId,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Task is updated",
      task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in register callback",
      error,
    });
  }
};

// User tasks Filter

exports.userTask = async (req, res) => {
  try {
    const { userId } = req.body;
    const task = await taskModel.find({ userId });
    if (!task) {
      return res.status(200).send({
        success: false,
        message: "No task is find",
      });
    }

    return res.status(200).send({
      success: true,
      message: "All blogs are find",
      task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in register callback",
      error,
    });
  }
};
