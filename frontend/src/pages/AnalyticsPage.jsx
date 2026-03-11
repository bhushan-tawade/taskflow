import React, { useState, useEffect } from "react"
import axios from "axios"

import { RiArrowRightSLine } from "react-icons/ri"
import { TbHome } from "react-icons/tb"

import { Responsive, WidthProvider } from "react-grid-layout/legacy"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import ChartRenderer from "../components/ChartRenderer"
import ChartBuilder from "../components/ChartBuilder"
import { MdOutlineClose } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"
import  useTasks  from "../hooks/useTasks"
import useCharts from "../hooks/useCharts"
import { getDataset } from "../services/analyticsHelpers"

const ResponsiveGridLayout = WidthProvider(Responsive)

const AnalyticsPage = () => {

    const { tasks } = useTasks();
    const { charts, layout, createChart, deleteChart,
        resetDashboard, handleLayoutChange } = useCharts();
    const [showBuilder, setShowBuilder] = useState(false);

      // ← add these back
  const TOTAL_ROWS = 6;
  const GRID_HEIGHT = Math.max(window.innerHeight - 200, 500);
  const ROW_HEIGHT = GRID_HEIGHT / TOTAL_ROWS;


    return (

        <div className="min-h-screen flex flex-col bg-[#1e1e1e] overflow-hidden p-3">

            {/* Breadcrumb */}
            <div className="w-full flex items-center px-2 sm:px-4 text-white/70 gap-2 h-12 sm:h-14">
                <TbHome size={22} />
                <RiArrowRightSLine size={22} />
                <p className="text-base sm:text-lg">Analytics</p>
            </div>

            <hr className="border-white/20 mb-4" />


            {/* Buttons */}
            <div className="flex flex-wrap gap-2 ml-2 sm:ml-3">

                <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm font-semibold"
                    onClick={() => setShowBuilder(true)}
                >
                    Create Chart
                </button>

                <button
                    onClick={resetDashboard}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white text-sm font-semibold"
                >
                    Reset Dashboard
                </button>

            </div>



            {/* Dashboard */}
            <div className="flex-1 px-2 mt-3 overflow-auto relative dotted-bg">

                {charts.length === 0 && (

                    <div className="text-white/40  flex items-center justify-center h-[75vh] text-lg">
                        No charts created yet
                    </div>

                )}


                {charts.length > 0 && (

                    <ResponsiveGridLayout
                        layouts={{
                            lg: layout,
                            md: layout,
                            sm: layout,
                            xs: layout,
                            xxs: layout
                        }}
                        breakpoints={{
                            lg: 1200,
                            md: 996,
                            sm: 768,
                            xs: 480,
                            xxs: 0
                        }}
                        cols={{
                            lg: 12,
                            md: 10,
                            sm: 6,
                            xs: 4,
                            xxs: 2
                        }}
                        rowHeight={ROW_HEIGHT}
                        margin={[16, 16]}
                        containerPadding={[0, 0]}
                        isResizable
                        isDraggable
                        draggableHandle=".drag-handle"
                        compactType="vertical"
                        onLayoutChange={handleLayoutChange}
                    >

                        {charts.map(chart => (

                            <div
                                key={chart.i}
                                className="w-full h-full bg-[#2a2a2a] rounded-xl p-3 sm:p-4 shadow-md flex flex-col"
                            >

                                {/* Header */}
                                <div className="drag-handle flex justify-between items-center mb-2 cursor-grab">

                                    <span className="text-white text-sm font-medium">
                                        {chart.title || "Chart"}
                                    </span>

                                    <button
                                        onClick={() => deleteChart(chart.i)}
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>

                                </div>

                                <hr className="my-2 border-white/20" />

                                {/* Chart */}
                                <div className="flex-1 w-full">

                                    <ChartRenderer
                                        chart={chart}
                                        data={getDataset(chart.dataset, tasks)}
                                    />

                                </div>

                            </div>

                        ))}

                    </ResponsiveGridLayout>

                )}

            </div>



            {/* Chart Builder Modal */}
            {showBuilder && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                    <div className="bg-[#1f1f1f] p-4 sm:p-6 rounded-xl w-[95%] sm:w-[420px]">

                        <div className="flex justify-end">

                            <button
                                className="text-red-400 hover:text-red-500"
                                onClick={() => setShowBuilder(false)}
                            >
                                <MdOutlineClose size={22} />
                            </button>

                        </div>

                        <ChartBuilder onCreate={createChart} />

                    </div>

                </div>

            )}

        </div>

    )

}

export default AnalyticsPage