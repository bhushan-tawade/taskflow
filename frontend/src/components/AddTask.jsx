import React, { useEffect } from 'react'

const AddTask = ({ createTask, title, setTitle, description, setDescription, priority, setPriority, category, setCategory, status, setStatus, dueDate, setDueDate, setIsAddModalOpen }) => {

    useEffect(() => {
        const pref = localStorage.getItem("defaultDueDate");

        if (!dueDate && pref === "tomorrow") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const formatted = tomorrow.toISOString().split("T")[0];
            setDueDate(formatted);
        }
    }, []);

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/40 dark:bg-black/40">

            <div className="bg-[#FFFAE5] dark:bg-[#1e1e1e] border-2 border-dashed dark:border-[#FFFF90] p-6 rounded-lg w-1/2">

                <h2 className="text-lg font-semibold mb-4 text-[#10162F] dark:text-[#FFFF90]">Add New Task</h2>
                <hr className="mb-3 border border-[#10162F] dark:border-[#FFFF90]" />

                {/* TITLE */}
                <input
                    className="text-black dark:text-white border rounded-lg bg-white dark:border-b dark:bg-transparent dark:border-0 dark:rounded-none dark:border-[#b5b5b5] p-2 w-full mb-4 outline-0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                {/* DESCRIPTION */}
                <textarea
                    className="border text-black dark:text-white bg-white dark:bg-transparent outline-0 p-2 w-full mb-2 rounded-lg dark:border-[#b5b5b5]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />

                <div className="flex gap-4 items-center justify-between mb-4">

                    {/* PRIORITY */}
                    <select
                        className="border p-2 w-full mb-2 dark:text-white bg-white dark:bg-transparent rounded-lg dark:border-[#b5b5b5]"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option className="text-black" value="low">Low</option>
                        <option className="text-black" value="medium">Medium</option>
                        <option className="text-black" value="high">High</option>
                    </select>

                    {/* CATEGORY */}
                    <select
                        className="border p-2 w-full mb-2 dark:text-white bg-white dark:bg-transparent rounded-lg dark:border-[#b5b5b5]"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option className="text-black" value="work">Work</option>
                        <option className="text-black" value="personal">Personal</option>
                        <option className="text-black" value="study">Study</option>
                    </select>

                    {/* DUE DATE */}
                    <input
                        type="date"
                        className="border p-2 w-full mb-2 dark:text-white bg-white dark:bg-transparent rounded-lg dark:border-[#b5b5b5]"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                </div>

                <div className="flex justify-end gap-2">

                    <button
                        onClick={() => setIsAddModalOpen(false)}
                        className="px-6 py-2 border dark:border-0 bg-gray-300 font-semibold rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            createTask();
                            setIsAddModalOpen(false);
                        }}
                        className="px-6 py-2 border dark:border-0 bg-[#FFD300] dark:bg-[#f5f546] text-black font-semibold rounded-lg"
                    >
                        Create
                    </button>

                </div>

            </div>

        </div>
    )
}

export default AddTask