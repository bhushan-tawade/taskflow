import { useState } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks }) {

    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title) return;

        try {

            await API.post("/tasks", { title });

            setTitle("");

            fetchTasks();

        } catch (error) {

            alert("Error creating task");
            console.log(error);

        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="flex gap-2 mb-6"
        >

            <input
                className="border p-2 flex-1 rounded"
                placeholder="Add new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button
                className="bg-blue-500 text-white px-4 rounded"
            >
                Add
            </button>

        </form>

    );
}

export default TaskForm;