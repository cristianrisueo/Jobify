import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils/customFetch"

// Context of the Dashboard and all its children
export const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
  // State
  const [user, setUser] = useState({ name: "John" })
  const [showSidebar, setShowSidebar] = useState(false)
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("darkTheme") || false
  )

  // useNavigate hook instance
  const navigate = useNavigate()

  // useEffect executed when darkTheme changes
  useEffect(() => {
    // Needed because fucking localStorage only stores strings
    if (darkTheme == "true") {
      setDarkTheme(true)
    } else if (darkTheme == "false") {
      setDarkTheme(false)
    }

    document.body.classList.toggle("dark-theme", darkTheme)
  }, [darkTheme])

  // Handlers
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme)
    localStorage.setItem("darkTheme", !darkTheme)
  }

  const logoutUser = async () => {
    setUser({})
    navigate("/")
    toast.success("Logged out")
    await customFetch.get("/users/logout")
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        darkTheme,
        setUser,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
