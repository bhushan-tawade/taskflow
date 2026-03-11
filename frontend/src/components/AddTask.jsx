import React from 'react'

const AddTask = ({createTask,title, setTitle, description, setDescription, priority, setPriority, category, setCategory,status, setStatus, dueDate, setDueDate, setIsAddModalOpen}) => {

    
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-black/40">

                    <div className="glass p-6 rounded-lg w-1/2 ">

                        <h2 className="text-lg font-semibold mb-4 text-[#FFFF90]">Add New Task</h2>
                        <hr className="mb-3 border border-[#FFFF90]"/>

                        {/* TITLE */}
                        <input
                            className="text-white border-b border-[#b5b5b5] p-2 w-full mb-4 outline-0"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />

                        {/* DESCRIPTION */}
                        <textarea
                            className="border text-white outline-0 p-2 w-full mb-2 rounded-lg border-[#b5b5b5]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />

                        <div className="flex gap-4 items-center justify-between mb-4">

                        
                        {/* PRIORITY */}
                        <select
                            className="border p-2 w-full mb-2 text-white rounded-lg border-[#b5b5b5]"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option className="text-black" value="low">Low</option>
                            <option className="text-black" value="medium">Medium</option>
                            <option className="text-black" value="high">High</option>
                        </select>

                        {/* CATEGORY */}
                        <select
                            className="border p-2 w-full mb-2 text-white rounded-lg border-[#b5b5b5]"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option className="text-black" value="work">Work</option>
                            <option className="text-black" value="personal">Personal</option>
                            <option className="text-black" value="study">Study</option>
                        </select>

                        {/* STATUS */}
                        <select
                            className="border p-2 w-full mb-2 text-white rounded-lg border-[#b5b5b5]"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option className="text-black" value="todo">Todo</option>
                            <option className="text-black" value="in_progress">In Progress</option>
                            <option className="text-black" value="completed">Completed</option>
                        </select>

                        {/* DUE DATE */}
                        <input
                            type="date"
                            className="border p-2 w-full mb-2 text-white rounded-lg border-[#b5b5b5]"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />

                        </div>


                        <div className="flex justify-end gap-2">

                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-6 py-2 bg-gray-300 font-semibold rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    createTask();
                                    setIsAddModalOpen(false);
                                }}
                                className="px-6 py-2 bg-[#f5f546] text-black font-semibold rounded-lg"
                            >
                                Create
                            </button>

                        </div>

                    </div>

                </div>
  )
}

export default AddTask