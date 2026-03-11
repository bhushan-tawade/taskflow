import React from 'react'
import { MdOutlineElectricBolt } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PiClockClockwise } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";

const TaskStat = ({ totalTasks, completedTasks, pendingTasks, overdueTasks }) => {

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            {/* Active Tasks */}
            <div className='bg-[#634ca6] rounded-2xl lg:hover:-translate-x-1 lg:hover:translate-y-1 transition-transform duration-300 ease-out'>
                <div className="relative bg-[#A27FFF] p-6 md:p-8 lg:p-10 rounded-2xl shadow text-center overflow-hidden lexend
                lg:hover:translate-x-2 lg:hover:-translate-y-2 transition-transform duration-300 ease-out">

                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#29213f]">
                        {totalTasks}
                    </p>

                    <p className="text-sm md:text-lg lg:text-2xl text-white mt-1 md:mt-2">
                        Active Tasks
                    </p>

                    <MdOutlineElectricBolt
                        className="absolute text-[#00000018] -top-4 -left-4 text-[70px] md:text-[90px] lg:text-[110px]"
                    />
                </div>
            </div>

            {/* Completed */}
            <div className='bg-[#469d5a] rounded-2xl lg:hover:-translate-x-1 lg:hover:translate-y-1 transition-transform duration-300 ease-out'>
                <div className="relative bg-[#83FF9F] p-6 md:p-8 lg:p-10 rounded-2xl shadow text-center overflow-hidden lexend
                lg:hover:translate-x-2 lg:hover:-translate-y-2 transition-transform duration-300 ease-out">

                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">
                        {completedTasks}
                    </p>

                    <p className="text-sm md:text-lg lg:text-2xl text-white mt-1 md:mt-2">
                        Completed
                    </p>

                    <IoCheckmarkCircleOutline
                        className="absolute text-[#00000018] -top-4 -left-4 text-[70px] md:text-[90px] lg:text-[110px]"
                    />
                </div>
            </div>

            {/* Pending */}
            <div className='bg-[#338599] rounded-2xl lg:hover:-translate-x-1 lg:hover:translate-y-1 transition-transform duration-300 ease-out'>
                <div className="relative bg-[#6CE0FF] p-6 md:p-8 lg:p-10 rounded-2xl shadow text-center overflow-hidden lexend
                lg:hover:translate-x-2 lg:hover:-translate-y-2 transition-transform duration-300 ease-out">

                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-600">
                        {pendingTasks}
                    </p>

                    <p className="text-sm md:text-lg lg:text-2xl text-white mt-1 md:mt-2">
                        Pending
                    </p>

                    <PiClockClockwise
                        className="absolute text-[#00000018] -top-4 -left-4 text-[70px] md:text-[90px] lg:text-[110px]"
                    />
                </div>
            </div>

            {/* Overdue */}
            <div className='bg-[#a23a3a] rounded-2xl lg:hover:-translate-x-1 lg:hover:translate-y-1 transition-transform duration-300 ease-out'>
                <div className="relative bg-[#FF6D6D] p-6 md:p-8 lg:p-10 rounded-2xl shadow text-center overflow-hidden lexend
                lg:hover:translate-x-2 lg:hover:-translate-y-2 transition-transform duration-300 ease-out">

                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600">
                        {overdueTasks}
                    </p>

                    <p className="text-sm md:text-lg lg:text-2xl text-white mt-1 md:mt-2">
                        Overdue
                    </p>

                    <IoCloseCircleOutline
                        className="absolute text-[#00000018] -top-4 -left-4 text-[70px] md:text-[90px] lg:text-[110px]"
                    />
                </div>
            </div>

        </div>
    )
}

export default TaskStat