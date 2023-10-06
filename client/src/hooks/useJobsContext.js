import { useContext } from "react"
import { JobsContext } from "../context/JobsContext"

// Exports the Dashboard context for anyone to use as a hook
export const useJobsContext = () => useContext(JobsContext)
