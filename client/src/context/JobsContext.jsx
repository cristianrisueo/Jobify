import { createContext, useEffect, useState } from "react"
import { redirect } from "react-router-dom"
import { customFetch } from "../utils/customFetch"
import { toast } from "react-toastify"

export const JobsContext = createContext()

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([])
  const [searchValues, setSearchValues] = useState({})

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data } = await customFetch.get("/jobs")
        setJobs(data)
      } catch (error) {
        toast.error(error?.response?.data?.error)
        return error.message
      }
    }

    loadJobs()
  }, [])

  const getAllJobs = async () => {
    try {
      const { data } = await customFetch.get("/jobs")
      setJobs(data)
    } catch (error) {
      toast.error(error?.response?.data?.error)
      return error.message
    }
  }

  const deleteJob = async (jobId) => {
    try {
      await customFetch.delete(`/jobs/${jobId}`)
      getAllJobs()
      toast.success("Job deleted successfully")
    } catch (error) {
      toast.error(error.response.data.error)
    }

    return redirect("/dashboard/all-jobs")
  }

  return (
    <JobsContext.Provider
      value={{
        jobs,
        searchValues,
        setSearchValues,
        setJobs,
        getAllJobs,
        deleteJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  )
}
