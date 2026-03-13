import React, { useState } from "react"

const ChartBuilder = ({ onCreate }) => {

    const [title, setTitle] = useState("")
    const [chartType, setChartType] = useState("")
    const [dataset, setDataset] = useState("")
    const [xAxis, setXAxis] = useState("")

    const handleSubmit = () => {

        if (!title || !chartType || !dataset) {
            alert("Please fill all required fields")
            return
        }

        onCreate({
            title,
            chartType,
            dataset,
            xAxis,
            yAxis: "count" // default value
        })

    }

    return (

        <div className="p-6 bg-white border dark:border-0 dark:bg-[#222] rounded-xl flex flex-col gap-4">

            <h2 className="dark:text-white text-[#10162F] text-xl font-semibold">
                Create Chart
            </h2>


            {/* Chart Title */}

            <input
                type="text"
                placeholder="Chart Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded dark:bg-[#333] text-black border dark:border-0 dark:text-white"
            />


            {/* Chart Type */}

            <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="p-2 rounded dark:bg-[#333] text-black border dark:border-0 dark:text-white"
            >

                <option value="">Select Chart Type</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>

            </select>


            {/* Dataset */}

            <select
                value={dataset}
                onChange={(e) => {

                    const value = e.target.value

                    setDataset(value)

                    // auto set x-axis
                    if (value === "category") setXAxis("category")
                    if (value === "priority") setXAxis("priority")
                    if (value === "status") setXAxis("status")
                    if (value === "completion") setXAxis("status")

                }}
                className="p-2 rounded dark:bg-[#333] text-black border dark:border-0 dark:text-white"
            >

                <option value="">Select Dataset</option>

                <option value="category">
                    Tasks by Category
                </option>

                <option value="priority">
                    Tasks by Priority
                </option>

                <option value="status">
                    Tasks by Status
                </option>

                <option value="completion">
                    Completion Rate
                </option>

            </select>


            {/* Create Button */}

            <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 border border-black dark:border-0 px-4 py-2 mt-2 rounded text-white"
            >

                Create Chart

            </button>

        </div>

    )

}

export default ChartBuilder