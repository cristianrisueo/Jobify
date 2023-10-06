import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { useJobsContext } from "../hooks/useJobsContext"
import { customFetch } from "../utils/customFetch"
import { JobsContainer, SearchContainer } from "../components"

// Gets the jobs for first time and when use filter
export const AllJobsLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  try {
    const { data } = await customFetch.get("/jobs", { params })
    return { data, searchValues: { ...params } }
  } catch (error) {
    return error.message
  }
}

const AllJobs = () => {
  const { setJobs, setSearchValues } = useJobsContext()
  const { data, searchValues } = useLoaderData()

  useEffect(() => {
    setJobs(data)
    setSearchValues(searchValues)
  }, [data, searchValues, setJobs, setSearchValues])

  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  )
}

export default AllJobs
