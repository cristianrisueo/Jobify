/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, Form, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils/customFetch"
import { JOB_STATUS, JOB_TYPE } from "../../../server/utils/constants"
import { FormRow, FormRowSelect, SubmitBtn } from "../components"
import Wrapper from "../assets/wrappers/DashboardFormPage"

export const editJobLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`)

    return data
  } catch (error) {
    toast.error(error?.response?.data?.error)
    return redirect("/dashboard/all-jobs")
  }
}

export const editJobAction = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.patch(`/jobs/${params.id}`, data)

    toast.success("Job edited successfully")
    return redirect("/dashboard/all-jobs")
  } catch (error) {
    toast.error(error.response.data.error)
    return error
  }
}

const EditJob = () => {
  const job = useLoaderData()

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="job position"
            name="position"
            defaultValue={job.position}
          />
          <FormRow
            type="text"
            labelText="job company"
            name="company"
            defaultValue={job.company}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="location"
            defaultValue={job.location}
          />

          <FormRowSelect
            name="status"
            labelText="job status"
            defaultValue={job.status}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="type"
            labelText="job type"
            defaultValue={job.type}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
