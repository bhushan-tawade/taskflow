import React, { useState } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { TbHome } from 'react-icons/tb'
import { TbLayoutKanban } from "react-icons/tb"
import { FaTable } from "react-icons/fa"

import DotGrid from '../utils/DotGrid'
import CountUp from '../utils/CountUp'

import TaskCard from '../components/TaskCard'
import TaskTable from '../components/TaskTable'
import AddTask from '../components/AddTask'
import RecentTask from '../components/RecentTask'

import useTasks from '../hooks/useTasks'

const TasksPage = () => {

    const {
        tasks,
        title, setTitle,
        description, setDescription,
        priority, setPriority,
        category, setCategory,
        status, setStatus,
        dueDate, setDueDate,
        createTask, deleteTask,
        toggleComplete, toggleInProgress,
        totalTasks, recentTasks
    } = useTasks()

    const [view, setView]                 = useState('kanban')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [tableFilter, setTableFilter]   = useState("all")

    // SUMMARY COUNTS
    const completedTasks  = tasks.filter(t => t.status === "completed").length
    const inProgressCount = tasks.filter(t => t.status === "in_progress").length
    const pendingCount    = tasks.filter(t => t.status === "todo").length
    const overdueTasks    = tasks.filter(t =>
        t.status === "todo" && t.due_date && new Date(t.due_date) < new Date()
    ).length

    // KANBAN COLUMNS
    const completedTaskList  = tasks.filter(t => t.status === "completed")
    const inProgressTaskList = tasks.filter(t => t.status === "in_progress")
    const pendingTaskList    = tasks.filter(t =>
        t.status === "todo" && (!t.due_date || new Date(t.due_date) >= new Date())
    )
    const overdueTaskList    = tasks.filter(t =>
        t.status === "todo" && t.due_date && new Date(t.due_date) < new Date()
    )

    // TABLE FILTER
    const tableFilteredTasks = tasks.filter(task => {
        if (tableFilter === "done") return task.is_done
        if (tableFilter === "due")  return task.due_date && new Date(task.due_date) < new Date() && !task.is_done
        return true
    })

    const handleEditClick = (task) => setSelectedTask(task)

    const kanbanColumn = (taskList, bgColor) => (
        <div className='flex flex-col gap-4'>
            {taskList.map(task => (
                <div key={task._id} className={`${bgColor} p-4 rounded-xl shadow text-left`}>
                    <TaskCard
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                        handleEditClick={handleEditClick}
                        toggleInProgress={toggleInProgress}
                    />
                </div>
            ))}
        </div>
    )

    return (
        <div className="h-[100vh] bg-[#1E1E1E] p-3 flex max-lg:flex-col max-lg:items-center justify-around gap-4">

            <div className="w-[95%] mx-auto">

                {/* BREADCRUMB */}
                <div className="w-full flex items-center justify-start px-4 text-white/70 gap-2 h-15">
                    <TbHome size={26} />
                    <RiArrowRightSLine size={26} />
                    <p className="text-lg">Tasks</p>
                </div>

                <hr className="border-white/20 mb-4" />

                <div className='w-full h-[86.6vh] rounded-4xl bg-[#2E2E2E] relative'>

                    {/* DOT GRID */}
                    <div className='w-[1050px] max-lg:w-[850px] max-md:w-[600px] h-[87vh] absolute z-0'>
                        <DotGrid
                            dotSize={3} gap={21}
                            baseColor="#222222" activeColor="#fff07a"
                            proximity={150} speedTrigger={100}
                            shockRadius={250} shockStrength={5}
                            maxSpeed={5000} resistance={750} returnDuration={1.5}
                        />
                    </div>

                    <div className='relative z-10 w-full h-[86vh] p-4 px-4 bg-transparent'>

                        {/* VIEW TOGGLE */}
                        <div className="w-full rounded-2xl bg-[#2E2E2E] mb-6">
                            <div className='bg-black/20 rounded-2xl px-6 flex gap-6 text-white/30'>
                                <button onClick={() => setView('kanban')}
                                    className={`py-3 px-2 border-b-2 cursor-pointer flex items-center gap-2 transition ease-in hover:text-[#FFF07A] ${view === 'kanban' && "text-[#FFF07A]"}`}>
                                    <TbLayoutKanban size={20} /> Kan Ban
                                </button>
                                <button onClick={() => setView('table')}
                                    className={`py-3 px-2 border-b-2 cursor-pointer flex items-center gap-2 transition ease-in hover:text-[#FFF07A] ${view === 'table' && "text-[#FFF07A]"}`}>
                                    <FaTable size={20} /> Table view
                                </button>
                            </div>
                        </div>

                        {/* KANBAN VIEW */}
                        {view === 'kanban' ? (
                            <div className='overflow-x-auto xl:overflow-x-visible min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>

                                {/* SUMMARY CARDS */}
                                <div className='grid grid-cols-4 gap-8 text-center mb-6 min-w-[1000px]'>
                                    {[
                                        { label: "Completed",  count: completedTasks,  color: "green"  },
                                        { label: "In Progress", count: inProgressCount, color: "yellow" },
                                        { label: "Pending",    count: pendingCount,    color: "cyan"   },
                                        { label: "Overdue",    count: overdueTasks,    color: "red"    },
                                    ].map(({ label, count, color }) => (
                                        <div key={label} className={`bg-white rounded-xl border-t-6 border-${color}-500 text-${color}-600 text-start px-4 py-4 flex items-center justify-between text-md font-semibold`}>
                                            {label}
                                            <div className={`bg-${color}-500 px-3 py-1 rounded-full text-white text-sm`}>{count}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* COLUMNS */}
                                <div className='grid grid-cols-4 gap-8 items-start h-[59vh] overflow-y-scroll no-scrollbar min-w-[1000px]'>
                                    {kanbanColumn(completedTaskList,  'bg-green-200')}
                                    {kanbanColumn(inProgressTaskList, 'bg-yellow-200')}
                                    {kanbanColumn(pendingTaskList,    'bg-cyan-100')}
                                    {kanbanColumn(overdueTaskList,    'bg-red-200')}
                                </div>

                            </div>

                        ) : (
                            // TABLE VIEW
                            <div className="bg-[#2E2E2E] w-full rounded-4xl p-4">
                                <TaskTable
                                    tasks={tableFilteredTasks}
                                    toggleComplete={toggleComplete}
                                    tableFilter={tableFilter}
                                    setTableFilter={setTableFilter}
                                    openAddModal={() => setIsAddModalOpen(true)}
                                    bodyHeight="h-[27vh] lg:h-[55vh]"
                                />
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className='w-[28%] max-lg:w-[95%] max-md:flex-col flex flex-col items-center justify-between gap-4 max-lg:flex-row'>
                <h1 className="mt-4 text-[#ffff90] text-5xl bricolage-grotesque max-lg:hidden">Taskflow</h1>
                <div className='bg-[#2E2E2E] w-full p-4 max-lg:flex max-lg:justify-center rounded-4xl'>
                    <RecentTask recentTasks={recentTasks} />
                </div>
                <div className='bg-[#2E2E2E] text-[#FFFF90] w-full h-77 max-lg:h-86 p-4 rounded-4xl text-center flex flex-col items-stretch justify-around'>
                    <h1 className='text-2xl'>Total Tasks</h1>
                    <hr />
                    <CountUp from={0} to={totalTasks} separator="," direction="up" duration={1}
                        className="count-up-text text-9xl font-bold text-[#FFFF90]" startCounting />
                    <button onClick={() => setIsAddModalOpen(true)}
                        className='bg-[#FFFF90] text-black text-xl py-4 px-4 rounded-xl font-bold cursor-pointer hover:scale-105 transition'>
                        Add Task
                    </button>
                </div>
            </div>

            {/* ADD TASK MODAL */}
            {isAddModalOpen && (
                <AddTask
                    createTask={createTask}
                    title={title} setTitle={setTitle}
                    description={description} setDescription={setDescription}
                    priority={priority} setPriority={setPriority}
                    category={category} setCategory={setCategory}
                    status={status} setStatus={setStatus}
                    dueDate={dueDate} setDueDate={setDueDate}
                    setIsAddModalOpen={setIsAddModalOpen}
                />
            )}

        </div>
    )
}

export default TasksPage