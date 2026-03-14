import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI } from "../services/taskService";

const useTasks = () => {

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");


  

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const res = await fetchTasksAPI(token);

      setTasks(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => { fetchTasks(); }, []);

  const createTask = async () => {

    if (!title.trim()) return toast.error("Title is required");
    if (title.length < 3) return toast.error("Title must be at least 3 characters");

    try {

      await createTaskAPI(token, { title, description, priority, category, due_date: dueDate });

      toast.success("Task created successfully");

      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("personal");
      setDueDate("");

      fetchTasks();

    } catch {

      toast.error("Failed to create task");

    }

  };

  const deleteTask = async (id) => {

    try {

      await deleteTaskAPI(token, id);

      toast.success("Task deleted");

      fetchTasks();

    } catch {

      toast.error("Delete failed");

    }

  };

  const toggleComplete = async (task) => {

    try {

      await updateTaskAPI(token, task._id, {
        is_done: !task.is_done,
        status: task.status === "completed" ? "todo" : "completed"
      });

      toast.success("Task status updated");

      fetchTasks();

    } catch {

      toast.error("Failed to update task");

    }

  };

  const toggleInProgress = async (task) => {

    try {

      await updateTaskAPI(token, task._id, {
        status: "in_progress",
        is_done: false
      });

      toast.success("Task moved to In Progress");

      fetchTasks();

    } catch {

      toast.error("Failed to update task");

    }

  };

  const updateTask = async (selectedTask, onSuccess) => {

    try {

      await updateTaskAPI(token, selectedTask._id, selectedTask);

      toast.success("Task updated");

      onSuccess();

      fetchTasks();

    } catch {

      toast.error("Update failed");

    }

  };

  // Derived values
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.is_done).length;
  const pendingTasks = tasks.filter(t => !t.is_done).length;
  const overdueTasks = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && !t.is_done).length;
  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return {
    tasks, loading,
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    category, setCategory,
    status, setStatus,
    dueDate, setDueDate,
    fetchTasks,
    createTask,
    deleteTask,
    toggleComplete,
    toggleInProgress,
    updateTask,
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    recentTasks
  };

};

export default useTasks;