import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const TaskAnalytics = ({ completionRate, chartData, COLORS }) => {
  return (
    <div className="p-4 relative  mb-6 rounded-xl">

      {/* Center Percentage */}
      <p className="absolute text-5xl text-[#B0B0B0] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {completionRate}%
      </p>

      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              dataKey="value"
              stroke="none"
              cornerRadius={12}
              paddingAngle={2}
              isAnimationActive
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default TaskAnalytics;