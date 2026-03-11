import React from 'react'
import Carousel from '../utils/Carousel'
import { LuFolders } from "react-icons/lu";




const RecentTask = ({ recentTasks }) => {
  return (
    <div>
      <p className='text-[#BCBBBC] pb-3 px-1.5 flex items-center gap-2'><LuFolders size={20} /> Recent Tasks</p>
      <hr className="border-white/20 mb-4 " />
      <div style={{ height: '260px', position: 'relative' }}>
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
    </div>
  )
}

export default RecentTask