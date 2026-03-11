import React from 'react'
import { IoClose } from 'react-icons/io5'

const SearchTask = ({ search, setSearch}) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">

                    <div className="relative w-full">

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 w-full pr-8"
                        />


                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                        >
                            <IoClose size={20} />
                        </button>


                    </div>

                </div>
  )
}

export default SearchTask