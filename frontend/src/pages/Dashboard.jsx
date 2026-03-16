import { useEffect, useState } from "react"
import { TbHome } from "react-icons/tb"
import { RiArrowRightSLine } from "react-icons/ri"
import { toast } from "react-toastify"
import { useRef } from "react";

import useTasks from "../hooks/useTasks"
import useUser from "../hooks/useUser";

import TaskCard from "../components/TaskCard"
import TaskStat from "../components/TaskStat"
import TaskAnalytics from "../components/TaskAnalytics"
import AddTask from "../components/AddTask"
import TaskTable from "../components/TaskTable"
import MyCalendar from "../components/MyCalendar"
import DueToday from "../components/DueToday"
import { HiBellAlert } from "react-icons/hi2";

function Dashboard() {

    const {
        tasks, loading,
        title, setTitle,
        description, setDescription,
        priority, setPriority,
        category, setCategory,
        status, setStatus,
        dueDate, setDueDate,
        createTask, deleteTask,
        toggleComplete, updateTask,
        totalTasks, completedTasks, pendingTasks, overdueTasks
    } = useTasks()

    const { user } = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [tableFilter, setTableFilter] = useState("all")

    const notified = useRef(false);

    // CHART DATA
    const completionRate = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100)

    const chartData = [
        { name: "Completed", value: completedTasks },
        { name: "Pending", value: pendingTasks }
    ]

    const COLORS = ["#22c55e", "#ef4444"]

    // TABLE FILTER
    const tableFilteredTasks = tasks.filter(task => {
        if (tableFilter === "done") return task.is_done
        if (tableFilter === "due") return task.due_date && new Date(task.due_date) < new Date() && !task.is_done
        return true
    })

    const handleUpdateTask = () => {
        updateTask(selectedTask, () => setIsModalOpen(false))
    }

    const now = new Date();

    const hour = new Date().getHours();

    let greeting = "Good Morning";

    if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
    } else if (hour >= 21 || hour < 5) {
        greeting = "Good Night";
    }

    const firstName = user?.name?.split(" ")[0];

    const showTodayDueNotification = (tasks) => {

        if (!user) return;

        const notificationsEnabled = localStorage.getItem("notificationsEnabled");
        if (notificationsEnabled === "false") return;

        const today = new Date().toDateString();

        const alreadyShown = sessionStorage.getItem("todayDueNotification");

        if (alreadyShown === "true") return;

        const todayTasks = tasks.filter(task =>
            !task.is_done &&
            task.due_date &&
            new Date(task.due_date).toDateString() === today
        );

        if (todayTasks.length === 0) return;

        sessionStorage.setItem("todayDueNotification", "true");


        toast(
            <div className=" w-full">
                <div className="font-semibold mb-2 flex gap-2">
                    <HiBellAlert size={20} className="text-orange-400" />
                    <p className="text-red-500">
                        Tasks Due Today
                    </p>
                </div>

                <ul className="list-disc ml-4 text-lg ">
                    {todayTasks.map(task => (
                        <li key={task._id}>
                            <div className="flex items-center justify-between w-full">
                                <p>
                                    {task.title}
                                </p>
                                <span className={`px-3 py-1 text-xs rounded-full
                                                ${task.priority === "high" && "bg-red-100 text-red-600"}
                                                ${task.priority === "medium" && "bg-yellow-100 text-yellow-700"}
                                                ${task.priority === "low" && "bg-green-100 text-green-600"}
                                `}>
                                    {task.priority}
                                </span>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>,
            {
                autoClose: false
            }
        );

    };

    const token = localStorage.getItem("token");

    useEffect(() => {

        if (user && tasks.length > 0) {
            showTodayDueNotification(tasks);
        }

    }, [tasks, user]);

    return (
        <div className="h-[98vh]  bg-[#FFF0E5] dark:bg-[#1E1E1E] p-3 flex max-lg:flex-col max-lg:items-center justify-around gap-4">

            <div className="w-[95%] mx-auto">

                {/* BREADCRUMB */}
                <div className="w-full flex items-center justify-start px-4 text-[#10162F] font-semibold dark:text-white/70 gap-2 h-15">
                    <TbHome size={26} />
                    <RiArrowRightSLine size={26} />
                    <p className="text-lg">Dashboard</p>
                </div>

                <hr className="dark:border-white/20" />

                <div className="px-4 flex items-center gap-1 text-[#10162F]  dark:text-white my-10">
                    <h1 className="text-5xl font-semibold dark:font-normal">
                        {greeting}, {firstName} !
                    </h1>

                </div>

                {/* TASK STATISTICS */}
                <TaskStat
                    totalTasks={totalTasks}
                    completedTasks={completedTasks}
                    pendingTasks={pendingTasks}
                    overdueTasks={overdueTasks}
                />

                {/* TASK TABLE */}
                <div className="bg-[#FFFFFF] h-[22.5rem] border dark:border-0 dark:bg-[#2E2E2E]  w-full rounded-4xl p-4">
                    <TaskTable
                        tasks={tableFilteredTasks}
                        toggleComplete={toggleComplete}
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        deleteTask={deleteTask}
                        openAddModal={() => setIsAddModalOpen(true)}
                        bodyHeight="h-50"
                    />
                </div>

                {/* LOADING / EMPTY STATES */}
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
                    </div>
                ) : null}

            </div>

            {/* RIGHT PANEL */}
            <div className="w-[35%] max-lg:w-[95%] max-md:flex-col flex flex-col items-center justify-around gap-4 max-lg:flex-row">
                <h1 className="mt-1 text-[#10162F] dark:text-[#ffff90] text-5xl bricolage-grotesque max-lg:hidden">Taskflow</h1>
                <div className="w-full max-lg:pt-10 bg-[#FFFFFF] border dark:border-0 dark:bg-[#2E2E2E] rounded-4xl h-70 max-lg:h-90">
                    <TaskAnalytics
                        completionRate={completionRate}
                        chartData={chartData}
                        COLORS={COLORS}
                    />
                </div>
                <div className="w-full p-4 bg-[#FFFFFF] border dark:border-0 dark:bg-[#2E2E2E] rounded-4xl h-91">
                    <DueToday
                        tasks={tasks}
                        toggleComplete={toggleComplete}
                    />
                </div>
            </div>

            {/* EDIT TASK MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">

                        <h2 className="text-lg font-bold mb-4">Edit Task</h2>

                        <input
                            className="border p-2 w-full mb-2"
                            value={selectedTask?.title || ""}
                            onChange={e => setSelectedTask({ ...selectedTask, title: e.target.value })}
                            placeholder="Title"
                        />

                        <textarea
                            className="border p-2 w-full mb-2"
                            value={selectedTask?.description || ""}
                            onChange={e => setSelectedTask({ ...selectedTask, description: e.target.value })}
                            placeholder="Description"
                        />

                        <select className="border p-2 w-full mb-2"
                            value={selectedTask?.priority || "medium"}
                            onChange={e => setSelectedTask({ ...selectedTask, priority: e.target.value })}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <select className="border p-2 w-full mb-2"
                            value={selectedTask?.category || "personal"}
                            onChange={e => setSelectedTask({ ...selectedTask, category: e.target.value })}>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="study">Study</option>
                        </select>

                        <select className="border p-2 w-full mb-2"
                            value={selectedTask?.status || "todo"}
                            onChange={e => setSelectedTask({ ...selectedTask, status: e.target.value })}>
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <input type="date" className="border p-2 w-full mb-4"
                            value={selectedTask?.due_date ? selectedTask.due_date.split("T")[0] : ""}
                            onChange={e => setSelectedTask({ ...selectedTask, due_date: e.target.value })}
                        />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)}
                                className="px-3 py-1 bg-gray-300 rounded">
                                Cancel
                            </button>
                            <button onClick={handleUpdateTask}
                                className="px-3 py-1 bg-blue-500 text-white rounded">
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

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

export default Dashboard