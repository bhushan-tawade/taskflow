import React from 'react'
import Carousel from '../utils/Carousel'
import { LuFolders } from "react-icons/lu";




const RecentTask = ({ recentTasks }) => {
  return (
    <div>
      <p className='dark:text-[#BCBBBC] pb-3 px-1.5 flex items-center gap-2'><LuFolders size={20} /> Recent Tasks</p>
      <hr className="dark:border-white/20 mb-4 bg-[#FFFAE5]" />
      {recentTasks.length ? (
        <div className='bg-[#FFFAE5] dark:bg-transparent rounded-3xl' style={{ height: '260px', position: 'relative' }}>
        <Carousel
          baseWidth={300}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
          items={recentTasks}
        />
      </div>
      ) : (
        <div className='bg-[#FFFAE5] dark:bg-transparent rounded-3xl border dark:border-white/20 dark:text-white/50 flex items-center justify-center' style={{ height: '260px', position: 'relative' }}>
        No Recent Task
      </div>
      )}
      
    </div>
  )
}

export default RecentTask