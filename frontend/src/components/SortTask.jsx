import React from 'react'

const SortTask = ({ categoryFilter, setCategoryFilter, priorityFilter, setPriorityFilter, sortBy, setSortBy}) => {
  return (
    <div className="flex gap-4 ">

                    

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border p-2 border-[#FFF07A] text-[#FFF07A] rounded-xl outline-0"
                    >
                        <option className='text-black bg-[#FFF07A]' value="all">All Categories</option>
                        <option className='text-black bg-[#FFF07A]' value="work">Work</option>
                        <option className='text-black bg-[#FFF07A]' value="personal">Personal</option>
                        <option className='text-black bg-[#FFF07A]' value="study">Study</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="border p-2 border-[#FFF07A] text-[#FFF07A] rounded-xl outline-0"
                    >
                        <option className='text-black bg-[#FFF07A]' value="all">All Priority</option>
                        <option className='text-black bg-[#FFF07A]' value="high">High</option>
                        <option className='text-black bg-[#FFF07A]' value="medium">Medium</option>
                        <option className='text-black bg-[#FFF07A]' value="low">Low</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border p-2 border-[#FFF07A] text-[#FFF07A] rounded-xl outline-0"
                    >
                        <option className='text-black bg-[#FFF07A]' value="newest">Newest</option>
                        <option className='text-black bg-[#FFF07A]' value="oldest">Oldest</option>
                        <option className='text-black bg-[#FFF07A]' value="due_date">Due Date</option>
                        <option className='text-black bg-[#FFF07A]' value="priority">Priority</option>
                    </select>

                </div>
  )
}

export default SortTask