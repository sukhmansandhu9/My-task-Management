const express = require("express");
const {
  addTaskController,
  getAllTaskController,
  deleteTaskController,
  updateTaskController,
  userTask,
} = require("../controllers/taskController");

// Router Object
const router = express.Router();

// POST || Add the task
router.post("/add-task", addTaskController);

// GET || Get all task
router.get("/get-task", getAllTaskController);

// Del || Delete a task
router.delete("/delete-task/:id", deleteTaskController);

// Put || Update the task
router.put("/update-task/:id", updateTaskController);

// Post || Get user task
router.post("/user-task", userTask);

module.exports = router;
