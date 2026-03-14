import React from "react";

const SortTask = ({
  tableFilter,
  setTableFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  onClose
}) => {

  const resetFilters = () => {
    setTableFilter("all");
    setCategoryFilter("all");
    setPriorityFilter("all");
    setSortBy("newest");
  };

  const applyFilters = () => {
    onClose();
  };

  return (
    <div className="flex flex-col gap-6">

      {/* TASK TYPE */}
      <div>
        <p className="text-sm font-semibold mb-2 dark:text-white">
          Task Type
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setTableFilter("all")}
            className={`px-3 py-2 rounded-lg border text-sm
              ${tableFilter === "all"
                ? "bg-[#FFD300] text-black"
                : "dark:text-white/70"}
            `}
          >
            All Tasks
          </button>

          <button
            onClick={() => setTableFilter("done")}
            className={`px-3 py-2 rounded-lg border text-sm
              ${tableFilter === "done"
                ? "bg-[#FFD300] text-black"
                : "dark:text-white/70"}
            `}
          >
            Done
          </button>

          <button
            onClick={() => setTableFilter("due")}
            className={`px-3 py-2 rounded-lg border text-sm
              ${tableFilter === "due"
                ? "bg-[#FFD300] text-black"
                : "dark:text-white/70"}
            `}
          >
            Due Tasks
          </button>
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <p className="text-sm font-semibold mb-2 dark:text-white">
          Category
        </p>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full border p-2 rounded-lg dark:bg-[#2E2E2E] dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="study">Study</option>
        </select>
      </div>

      {/* PRIORITY */}
      <div>
        <p className="text-sm font-semibold mb-2 dark:text-white">
          Priority
        </p>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full border p-2 rounded-lg dark:bg-[#2E2E2E] dark:text-white"
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* SORT BY */}
      <div>
        <p className="text-sm font-semibold mb-2 dark:text-white">
          Sort By
        </p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border p-2 rounded-lg dark:bg-[#2E2E2E] dark:text-white"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="due_date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between gap-3 pt-2">

        <button
          onClick={resetFilters}
          className="flex-1 border dark:text-white py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
        >
          Reset
        </button>

        

        <button
          onClick={applyFilters}
          className="flex-1 bg-[#FFD300] text-black py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          Update
        </button>

      </div>

    </div>
  );
};

export default SortTask;