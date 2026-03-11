const express = require("express");

const {
createTask,
getTasks,
toggleTask,
deleteTask,
updateTask
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTask);

router.patch("/:id/done", protect, toggleTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;