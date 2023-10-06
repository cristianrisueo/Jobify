import { useContext } from "react"
import { DashboardContext } from "../context/DashboardContext"

// Exports the Dashboard context for anyone to use as a hook
export const useDashboardContext = () => useContext(DashboardContext)
