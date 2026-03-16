import { FiCheckSquare } from "react-icons/fi"
import { TbCalendarDue } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

function DueToday({ tasks, toggleComplete }) {

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dueTasks = tasks
        .filter(task => task.due_date)
        .filter(task => {
            const due = new Date(task.due_date)
            due.setHours(0, 0, 0, 0)

            return due <= today
        })

    const getStatus = (task) => {

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const due = new Date(task.due_date)
        due.setHours(0, 0, 0, 0)

        if (task.is_done) return "done"
        if (due < today) return "overdue"
        if (due.getTime() === today.getTime()) return "today"

        return ""
    }

    const statusColor = {
        overdue: "text-red-500",
        today: "text-yellow-500",
        done: "text-gray-400"
    }

    return (
        <div className="h-full flex flex-col">

            {/* HEADER */}
            <div className="flex justify-start items-center gap-2 mb-3 dark:text-white/60">
                <TbCalendarDue size={25} />
                <h2 className="font-semibold text-[#10162F] dark:text-white/60  py-1">
                    Due Today
                </h2>


            </div>

            <hr className="mb-2 dark:border-white/10" />

            {/* TASK LIST */}
            <div className="flex flex-col gap-3 mt-2 overflow-y-auto no-scrollbar max-h-60 pr-1">

                {dueTasks.length === 0 && (
                    <p className="text-sm text-center text-gray-400">
                        No due tasks
                    </p>
                )}

                {dueTasks.map(task => {

                    const status = getStatus(task)

                    return (
                        <div
                            key={task._id}
                            className={`flex items-center justify-between text-sm ${task.is_done ? "line-through opacity-60" : ""}`}
                        >

                            <div className="flex items-center gap-2">

                                <input
                                    type="checkbox"
                                    checked={task.is_done}
                                    onChange={() => toggleComplete(task)}
                                    className="w-3 h-3  cursor-pointer"
                                />

                                <span className="text-[#10162F] text-lg dark:text-white">
                                    {task.title}
                                </span>

                            </div>

                            <span className={`text-xs font-semibold ${statusColor[status]}`}>
                                {status === "overdue" && "Overdue"}
                                {status === "today" && "Today"}
                                {status === "done" && "Done"}
                            </span>

                        </div>
                    )
                })}
            </div>

            {dueTasks.length > 6 && (

                <div className="w-full dark:text-white/50 flex items-center justify-center">

                    <IoIosArrowDown size={20} />

                </div>

            )}


        </div>
    )
}

export default DueToday