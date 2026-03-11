const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
    try {

        const { title, description, category, priority, due_date } = req.body;

        const task = new Task({
            user: req.user,   // req.user already contains user id
            title,
            description,
            category,
            priority,
            due_date
        });

        await task.save();

        res.status(201).json(task);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
};

// GET TASKS
const getTasks = async (req, res) => {

    try {

        const { status, category } = req.query;

        let filter = { user: req.user };

        if (category) {
            filter.category = category;
        }

        if (status === "completed") {
            filter.is_done = true;
        }

        if (status === "pending") {
            filter.is_done = false;
        }

        if (status === "overdue") {
            filter.is_done = false;
            filter.due_date = { $lt: new Date() };
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        res.json(tasks);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }

};

// TOGGLE COMPLETE
const toggleTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.is_done = !task.is_done;

        await task.save();

        res.json(task);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }

};

// DELETE TASK
const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.deleteOne();

        res.json({ message: "Task deleted" });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }

};

// UPDATE TASK
const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

module.exports = {
    createTask,
    getTasks,
    toggleTask,
    deleteTask,
    updateTask
};