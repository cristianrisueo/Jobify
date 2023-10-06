import { useJobsContext } from "../hooks/useJobsContext"
import Job from "./Job"
import PageBtnContainer from "./PageBtnContainer"
import Wrapper from "../assets/wrappers/JobsContainer"

const JobsContainer = () => {
  const {
    jobs: { totalJobs, numOfPages, jobs },
  } = useJobsContext()

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs?.length > 1 && "s"} found
      </h5>

      {jobs?.length === 0 ? (
        <h2>No jobs to display</h2>
      ) : (
        jobs?.map((job) => <Job key={job._id} job={job} />)
      )}

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
