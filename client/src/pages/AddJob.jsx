import { useContext, useEffect } from "react"
import { redirect, useLoaderData, Form } from "react-router-dom"
import { toast } from "react-toastify"
import { DashboardContext } from "../context/DashboardContext"
import { customFetch } from "../utils/customFetch"
import { JOB_STATUS, JOB_TYPE } from "../../../server/utils/constants"
import { FormRow, FormRowSelect, SubmitBtn } from "../components"
import Wrapper from "../assets/wrappers/DashboardFormPage"

// Loader that returns the data of the current user
// eslint-disable-next-line react-refresh/only-export-components
export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user")
    return data
  } catch (error) {
    console.log(error.response.data.error)
    return redirect("/")
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const submitJobFormHandler = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post("/jobs", data)
    toast.success("Job added successfully")
    return redirect("all-jobs")
  } catch (error) {
    toast.error(error?.response?.data?.error)
    return error
  }
}

const AddJob = () => {
  const { setUser } = useContext(DashboardContext)
  const { _id, email, name, lastName, location, role, avatar } = useLoaderData()

  useEffect(
    () => setUser({ _id, email, name, lastName, location, role, avatar }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" labelText="Job" />
          <FormRow type="text" name="company" labelText="Company" />
          <FormRow
            type="text"
            labelText="Location"
            name="location"
            defaultValue={location}
          />
          <FormRowSelect
            labelText="job status"
            name="status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="type"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
