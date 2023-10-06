import { Form, Link, useSubmit } from "react-router-dom"
import { useJobsContext } from "../hooks/useJobsContext"
import { JOB_STATUS, JOB_TYPE, SHORT_BY } from "../../../server/utils/constants"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, FormRowSelect } from "."

const SearchContainer = () => {
  const submit = useSubmit()
  const { searchValues } = useJobsContext()
  const { search, status, type, sort } = searchValues

  // Used to delay .5 seconds the logic. Search debounce on YT for more
  const debounce = (onChange) => {
    let timeout

    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        onChange(form)
      }, 500)
    }
  }

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>

        <div className="form-center">
          <FormRow
            labelText="Company or position"
            type="search"
            name="search"
            isRequired="no"
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />

          <FormRowSelect
            labelText="job status"
            name="status"
            list={["All", ...Object.values(JOB_STATUS)]}
            defaultValue={status}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            labelText="job type"
            name="type"
            list={["All", ...Object.values(JOB_TYPE)]}
            defaultValue={type}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            name="sort"
            list={[...Object.values(SHORT_BY)]}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
