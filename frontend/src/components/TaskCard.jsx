import React from 'react'
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaPersonRunning } from "react-icons/fa6";

const TaskCard = ({ task, toggleComplete, deleteTask, handleEditClick, toggleInProgress }) => {

    const today = new Date();

    const isOverdue =
        task.due_date &&
        new Date(task.due_date) < today &&
        !task.is_done;

    const dueSoon =
        task.due_date &&
        new Date(task.due_date) > today &&
        new Date(task.due_date) - today < 24 * 60 * 60 * 1000 &&
        !task.is_done;

    const priorityColor = {
        high: "text-red-500",
        medium: "text-yellow-500",
        low: "text-green-500"
    };

    const categoryColor =
        task.category === "personal"
            ? "text-[#F77FEE] border-[#F77FEE]"
            : task.category === "work"
                ? "text-[#835AF1] border-[#835AF1]"
                : "text-[#D67BFF] border-[#D67BFF]";



    return (
        <div
            key={task._id}
            className={`bg-transparent p-0 rounded`}>

            <div className="flex items-center justify-between mb-2">
                <div className={`${categoryColor} bg-white border  text-xs font-lite px-3 py-1 rounded-2xl flex items-center justify-center gap-2`}>
                    {task.category === "personal" ? (
                        <FaPersonRunning size={14} />
                    ) : task.category === "work" ? (
                        <MdWork size={14} />
                    ) : (
                        <FaBook size={14} />
                    )}

                    <p>
                        {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </p>
                </div>

                <div className='flex gap-3 text-gray-500'>
                    <button onClick={() => handleEditClick(task)} className='cursor-pointer hover:text-sky-700'>
                        <FiEdit3 size={20} />
                    </button>
                    <button onClick={() => deleteTask(task._id)} className='cursor-pointer hover:text-red-400'>
                        <AiOutlineDelete size={20} />
                    </button>
                </div>



            </div>
            <h2 className='text-xl'> {task.title}</h2>
            <p className="text-gray-600">
                {task.description}
            </p>

            <p className={priorityColor[task.priority]}>
                Priority: {task.priority}
            </p>

            <button
                onClick={() => toggleComplete(task)}
                className={`w-full mt-3 font-semibold shadow-md cursor-pointer bg-white rounded-xl p-2 transition hover:scale-102 ${task.status != 'completed' ? 'text-green-400' : 'text-red-400'}`}
            >
                {task.status != 'completed' ? 'Mark as done' : 'Mark as Undone'}
            </button>

            {
                task.status != 'in_progress' && task.status != 'completed' && (
            
            <button
                onClick={() => toggleInProgress(task)}
                className={`w-full mt-3 font-semibold shadow-md cursor-pointer bg-white rounded-xl p-2 transition hover:scale-102 ${task.status != 'completed' ? 'text-green-400' : 'text-red-400'}`}
            >
                Mark in Progress
            </button>)
}

            {/* <div>

                <h2
                    className={`text-xl font-semibold ${task.is_done && "line-through text-gray-400"}`}
                >
                    {task.title}
                </h2>

                <p className="text-gray-600">
                    {task.description}
                </p>

                <p className="text-sm text-gray-500">
                    Category: {task.category}
                </p>

                <p className={priorityColor[task.priority]}>
                    Priority: {task.priority}
                </p>

                <p className="text-sm text-gray-500">
                    Status: {task.status}
                </p>

                <p className="text-sm text-gray-500">
                    Due: {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "No date"}
                </p>

                {isOverdue && (
                    <p className="text-red-500 text-sm font-semibold">
                        Overdue
                    </p>
                )}

                {dueSoon && (
                    <p className="text-orange-500 text-sm font-semibold">
                        Due Soon ⏰
                    </p>
                )}

            </div>

            <div className="flex flex-col gap-2">

                <button
                    onClick={() => toggleComplete(task)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    ✓
                </button>

                <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>

                <button
                    onClick={() =>
                        handleEditClick(task)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>

            </div> */}

        </div>
    )
}

export default TaskCard