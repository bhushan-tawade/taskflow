import { useState, useEffect } from "react";

const useCharts = () => {
  const [charts, setCharts]           = useState([]);
  const [chartsLoaded, setChartsLoaded] = useState(false);

  // Load
  useEffect(() => {
    const saved = localStorage.getItem("charts");
    if (saved) setCharts(JSON.parse(saved));
    setChartsLoaded(true);
  }, []);

  // Save
  useEffect(() => {
    if (!chartsLoaded) return;
    localStorage.setItem("charts", JSON.stringify(charts));
  }, [charts, chartsLoaded]);

  const createChart = (config) => {
    const isMobile = window.innerWidth < 768;
    setCharts(prev => [...prev, {
      ...config,
      dataset: config.dataset || "category",
      i: Date.now().toString(),
      x: 0, y: Infinity,
      w: isMobile ? 4 : 4, h: 4
    }]);
  };

  const deleteChart = (id) =>
    setCharts(prev => prev.filter(c => c.i !== id));

  const resetDashboard = () => {
    localStorage.removeItem("charts");
    setCharts([]);
  };

  const handleLayoutChange = (currentLayout) =>
    setCharts(prev => prev.map(chart => {
      const updated = currentLayout.find(l => l.i === chart.i);
      return updated ? { ...chart, ...updated } : chart;
    }));

  const layout = charts.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));

  return { charts, layout, createChart, deleteChart, resetDashboard, handleLayoutChange };
};

export default useCharts;  