import { Link } from "react-router-dom"
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa"
import { useJobsContext } from "../hooks/useJobsContext"
import Wrapper from "../assets/wrappers/Job"
import JobInfo from "./JobInfo"
import day from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
day.extend(advancedFormat)

const Job = ({ job }) => {
  const { _id, company, position, location, status, type, createdAt } = job
  const date = day(createdAt).format("MMM Do, YYYY")

  const { deleteJob } = useJobsContext()

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={type} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>

          <button onClick={() => deleteJob(_id)} className="btn delete-btn">
            Delete
          </button>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
