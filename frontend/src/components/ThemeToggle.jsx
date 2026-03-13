import { MdDarkMode, MdLightMode } from 'react-icons/md'
import useTheme from '../hooks/useTheme'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-xl border border-black text-black 
                 hover:text-[#FFD300] dark:hover:text-[#FFFF90] hover:bg-black transition'
    >
      {isDark ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
    </button>
  )
}

export default ThemeToggle