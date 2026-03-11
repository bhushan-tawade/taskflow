import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts"

const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
    "#06b6d4"
]

const ChartRenderer = ({ chart, data }) => {

    if (!chart || !data) return null

    return (

        <div className="w-full h-full">

            {/* BAR CHART */}
            {chart.chartType === "bar" && (

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                    >

                        <XAxis dataKey={chart.xAxis} />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar
                            dataKey={chart.yAxis}
                            radius={[6, 6, 0, 0]}
                            fill="#3b82f6"
                        />

                    </BarChart>

                </ResponsiveContainer>

            )}

            {/* LINE CHART */}
            {chart.chartType === "line" && (

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                    >

                        <XAxis dataKey={chart.xAxis} />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey={chart.yAxis}
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            )}

            {/* PIE CHART */}
            {chart.chartType === "pie" && (

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey={chart.yAxis}
                            nameKey={chart.xAxis}
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            label
                        >

                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}

                        </Pie>

                        <Tooltip />
                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            )}

            {/* FALLBACK */}
            {!["bar", "line", "pie"].includes(chart.chartType) && (

                <div className="flex items-center justify-center h-full text-white/40">
                    Invalid chart type
                </div>

            )}

        </div>

    )

}

export default ChartRenderer