import { useEffect, useState } from "react"

const useTheme = () => {

  const getTheme = () => localStorage.getItem("theme") === "dark"

  const [isDark, setIsDark] = useState(getTheme())

  useEffect(() => {

    const handleThemeChange = () => {
      setIsDark(getTheme())
    }

    window.addEventListener("themeChange", handleThemeChange)

    return () => window.removeEventListener("themeChange", handleThemeChange)

  }, [])

  useEffect(() => {

    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

  }, [isDark])

  const toggleTheme = () => {

    const newTheme = !getTheme()

    localStorage.setItem("theme", newTheme ? "dark" : "light")

    document.documentElement.classList.toggle("dark", newTheme)

    window.dispatchEvent(new Event("themeChange"))

    setIsDark(newTheme)
  }

  return { isDark, toggleTheme }
}

export default useTheme