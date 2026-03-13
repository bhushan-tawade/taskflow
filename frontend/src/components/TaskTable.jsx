import React, { useState } from 'react'
import { CgFileDocument } from "react-icons/cg";
import { LuText } from "react-icons/lu";
import { TbCategoryFilled } from "react-icons/tb";
import { MdLowPriority } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from 'react-router-dom';
import SortTask from './SortTask';

const TaskTable = ({ tasks, toggleComplete, tableFilter, setTableFilter, openAddModal, bodyHeight = "h-60" }) => {


    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const [sortBy, setSortBy] = useState("newest");

    const filteredTasks = tasks.filter((task) => {



        const matchPriority =
            priorityFilter === "all" || task.priority === priorityFilter;

        const matchCategory =
            categoryFilter === "all" || task.category === categoryFilter;

        const matchStatus =
            statusFilter === "all" || task.status === statusFilter;

        return matchPriority && matchCategory && matchStatus;
    });


    const sortedTasks = [...filteredTasks].sort((a, b) => {

        if (sortBy === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        if (sortBy === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }

        if (sortBy === "due_date") {
            return new Date(a.due_date || 0) - new Date(b.due_date || 0);
        }

        if (sortBy === "priority") {
            const order = { high: 1, medium: 2, low: 3 };
            return order[a.priority] - order[b.priority];
        }

        return 0;

    });


    return (
        <div className='dark:bg-[#2E2E2E]'>

            {/* HEADER */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-3'>
                <Link to="/tasks">
                    <div className='flex items-center gap-4'>


                        <div className='p-2 border rounded-2xl dark:border-white/20 dark:text-white/40 w-fit  hover:text-[#FFD300] dark:hover:text-amber-200 hover:border-[#FFD300] dark:hover:border-amber-200'>
                            <CgFileDocument size={24} />
                        </div>

                        <h1 className='text-lg font-semibold dark:text-[#FFFF90]'>
                            Task List
                        </h1>



                    </div>
                </Link>

                {/* Sorting */}
                <div className='bg-[#FFFAE5] border border-black dark:border-0 dark:bg-black/20 rounded-2xl px-4 flex flex-wrap gap-4 text-black/50 dark:text-white/30'>

                    <button
                        onClick={() => setTableFilter("all")}
                        className={`py-2 px-2 border-b-2 cursor-pointer ${tableFilter === "all"
                            ? "text-[#10162F]  dark:text-[#FFFF90] dark:border-[#FFFF90]"
                            : "border-transparent dark:hover:border-white/40"
                            }`}
                    >
                        All Tasks
                    </button>

                    <button
                        onClick={() => setTableFilter("done")}
                        className={`py-2 px-2 border-b-2 cursor-pointer ${tableFilter === "done"
                            ? "text-[#10162F] dark:text-[#FFFF90] dark:border-[#FFFF90]"
                            : "border-transparent hover:border-white/40"
                            }`}
                    >
                        Done
                    </button>

                    <button
                        onClick={() => setTableFilter("due")}
                        className={`py-2 px-2 border-b-2 cursor-pointer ${tableFilter === "due"
                            ? "text-[#10162F]  dark:text-[#FFFF90] dark:border-[#FFFF90]"
                            : "border-transparent hover:border-white/40"
                            }`}
                    >
                        Due Tasks
                    </button>

                </div>
                

                <SortTask categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} sortBy={sortBy} setSortBy={setSortBy} />


                <button
                    onClick={openAddModal}
                    className='bg-[#FFD300] border dark:border-0 dark:bg-[#FFFF90] px-4 py-2 rounded-xl font-semibold hover:scale-105 transition w-full lg:w-auto'
                >    Add Task
                </button>
            </div>

            <hr className='border-white/10' />

            {/* TABLE */}
            <div className="mt-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                {/* HEADER TABLE */}
                <table className="max-[1024px]:w-[800px] w-[65vw] sticky top-0 rounded-t-lg bg-[#10162F]  dark:bg-[#2E2E2E] overflow-x-scroll ">
                    <thead className="border-b border-white/10">
                        <tr className="text-white dark:text-white/50 text-left">

                            <th className="px-4 py-2 w-10">
                                <MdOutlineCheckBoxOutlineBlank size={16} />
                            </th>

                            <th className="px-4 py-3 font-normal">
                                <div className="flex items-center gap-3">
                                    <LuText size={16} />
                                    <span>Title</span>
                                </div>
                            </th>

                            <th className="px-4 py-3 font-normal">
                                <div className="flex items-center gap-3">
                                    <TbCategoryFilled size={16} />
                                    <span>Category</span>
                                </div>
                            </th>

                            <th className="px-4 py-3 font-normal">
                                <div className="flex items-center gap-3">
                                    <MdLowPriority size={16} />
                                    <span>Priority</span>
                                </div>
                            </th>

                            <th className="px-4 py-3 font-normal">
                                <div className="flex items-center gap-3">
                                    <RiLoader2Fill size={16} />
                                    <span>Status</span>
                                </div>
                            </th>

                            <th className="px-4 py-3 font-normal">
                                <div className="flex items-center gap-3">
                                    <LuCalendar size={16} />
                                    <span>Due Date</span>
                                </div>
                            </th>

                        </tr>
                    </thead>
                </table>

                {/* SCROLLABLE BODY */}
                <div className={`${bodyHeight} `}>

                    <table className=" max-[1024px]:w-[800px] border dark:border-0 w-[65vw] overflow-x-scroll table-fixed">
                        <tbody className="text-white">

                            {sortedTasks.length === 0 ? (

                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-400">
                                        There is no such Task
                                    </td>
                                </tr>

                            ) : (

                                sortedTasks.map((task) => (

                                    <tr
                                        key={task._id}
                                        className="border-b border-[#10162F] text-black dark:text-white dark:border-white/20"
                                    >

                                        {/* CHECKBOX */}
                                        <td className="px-4 py-3 w-10">
                                            <input
                                                type="checkbox"
                                                checked={task.is_done}
                                                onChange={() => toggleComplete(task)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                        </td>

                                        {/* TITLE */}
                                        <td className={`px-4 py-3 font-medium
${task.is_done ? "line-through text-gray-400" : ""}
`}>
                                            {task.title}
                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-4 py-3 capitalize">
                                            {task.category}
                                        </td>

                                        {/* PRIORITY */}
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 text-xs rounded-full
${task.priority === "high" && "bg-red-100 text-red-600"}
${task.priority === "medium" && "bg-yellow-100 text-yellow-700"}
${task.priority === "low" && "bg-green-100 text-green-600"}
`}>
                                                {task.priority}
                                            </span>
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 text-xs rounded-full
${task.status === "completed" && "bg-green-100 text-green-600"}
${task.status === "in_progress" && "bg-purple-100 text-purple-600"}
${task.status === "todo" && "bg-gray-200 text-gray-600"}
`}>
                                                {task.status.replace("_", " ")}
                                            </span>
                                        </td>

                                        {/* DUE DATE */}
                                        <td className="px-4 py-3">
                                            {task.due_date
                                                ? new Date(task.due_date).toLocaleDateString()
                                                : "-"}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    )
}

export default TaskTable