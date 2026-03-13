import { useState } from "react"
import { FiChevronDown, FiChevronRight } from "react-icons/fi"
import { TbBriefcase, TbHome, TbBooks } from "react-icons/tb"

function CategoryView({ tasks, toggleComplete }) {

    const [openCategory, setOpenCategory] = useState(null)

    const categories = {
        work: {
            label: "Work",
            icon: <TbBriefcase className="dark:text-white/50" size={22} />,
            color: "bg-blue-500"
        },
        personal: {
            label: "Personal",
            icon: <TbHome className="dark:text-white/50" size={22} />,
            color: "bg-purple-500"
        },
        study: {
            label: "Study",
            icon: <TbBooks className="dark:text-white/50" size={22} />,
            color: "bg-orange-500"
        }
    }

    const today = new Date()
    today.setHours(0,0,0,0)

    const getStatus = (task) => {
        if (task.is_done) return "Done"

        const due = new Date(task.due_date)
        due.setHours(0,0,0,0)

        if (due < today) return "Overdue"
        if (due.getTime() === today.getTime()) return "Today"

        return ""
    }

    return (
        <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto">

            {Object.keys(categories).map(cat => {

                const catTasks = tasks.filter(t => t.category === cat)

                const completed = catTasks.filter(t => t.is_done).length
                const percent = catTasks.length === 0
                    ? 0
                    : Math.round((completed / catTasks.length) * 100)

                const isOpen = openCategory === cat

                return (
                    <div
                        key={cat}
                        className="bg-white dark:bg-[#272727] border dark:border-white/10 rounded-2xl overflow-hidden"
                    >

                        {/* CATEGORY HEADER */}
                        <div
                            onClick={() => setOpenCategory(isOpen ? null : cat)}
                            className="flex items-center justify-between p-4 cursor-pointer"
                        >

                            <div className="flex items-center gap-3">

                                <div className="p-2 rounded-lg bg-gray-100 dark:bg-black/20">
                                    {categories[cat].icon}
                                </div>

                                <div>
                                    <p className="font-semibold text-[#10162F] dark:text-white">
                                        {categories[cat].label}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {catTasks.length} tasks · {completed} completed
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                {/* PROGRESS */}
                                <div className="flex items-center gap-2 w-32">

                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`${categories[cat].color} h-2`}
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>

                                    <span className="text-sm font-semibold text-gray-500">
                                        {percent}%
                                    </span>

                                </div>

                                {isOpen ? <FiChevronDown className="dark:text-white"/> : <FiChevronRight className="dark:text-white"/>}
                            </div>
                        </div>

                        {/* TASK LIST */}
                        {isOpen && (
                            <div className="border-t dark:border-white/10">

                                {catTasks.length === 0 && (
                                    <p className="text-center text-gray-400 py-4">
                                        No tasks
                                    </p>
                                )}

                                {catTasks.slice(0,3).map(task => {

                                    const status = getStatus(task)

                                    return (
                                        <div
                                            key={task._id}
                                            className="flex items-center justify-between px-4 py-3 border-b dark:border-white/10"
                                        >

                                            <div className="flex items-center dark:text-white gap-2">

                                                <input
                                                    type="checkbox"
                                                    checked={task.is_done}
                                                    onChange={() => toggleComplete(task)}
                                                />

                                                <span className={`${task.is_done ? "line-through opacity-60" : ""}`}>
                                                    {task.title}
                                                </span>

                                            </div>

                                            <span className={`text-xs font-semibold
                                                ${status === "Overdue" && "text-red-500"}
                                                ${status === "Today" && "text-yellow-500"}
                                                ${status === "Done" && "text-gray-400"}
                                            `}>
                                                {status}
                                            </span>

                                        </div>
                                    )
                                })}
                            </div>
                        )}

                    </div>
                )
            })}

        </div>
    )
}

export default CategoryView