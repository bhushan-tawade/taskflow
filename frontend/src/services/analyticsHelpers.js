export const getCategoryData = (tasks) =>
  Object.values(tasks.reduce((acc, task) => {
    acc[task.category] ??= { category: task.category, count: 0 };
    acc[task.category].count++;
    return acc;
  }, {}));

export const getStatusData = (tasks) =>
  Object.values(tasks.reduce((acc, task) => {
    acc[task.status] ??= { status: task.status, count: 0 };
    acc[task.status].count++;
    return acc;
  }, {}));

export const getPriorityData = (tasks) =>
  Object.values(tasks.reduce((acc, task) => {
    acc[task.priority] ??= { priority: task.priority, count: 0 };
    acc[task.priority].count++;
    return acc;
  }, {}));

export const getCompletionData = (tasks) => [
  { status: "Completed", count: tasks.filter(t => t.is_done).length },
  { status: "Pending",   count: tasks.filter(t => !t.is_done).length }
];

export const getDataset = (dataset, tasks) => {
  switch (dataset) {
    case "category":   return getCategoryData(tasks);
    case "status":     return getStatusData(tasks);
    case "priority":   return getPriorityData(tasks);
    case "completion": return getCompletionData(tasks);
    default:           return [];
  }
};