import { Form } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils/customFetch"
import { useDashboardContext } from "../hooks/useDashboardContext"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, SubmitBtn } from "../components"

// eslint-disable-next-line react-refresh/only-export-components
export const profileAction = async ({ request }) => {
  const formData = await request.formData()

  const file = formData.get("avatar")
  if (file && file.size > 500000) return toast.error("Image too large")

  try {
    await customFetch.patch("/users/update-user", formData)
    toast.success("Profile updated successfully")
  } catch (error) {
    toast.error(error?.response?.data?.error)
  }

  return null
}

const Profile = () => {
  const { user } = useDashboardContext()
  const { name, lastName, email, location } = user

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>

          <FormRow
            type="text"
            labelText="name"
            name="name"
            defaultValue={name}
          />

          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            defaultValue={lastName}
          />

          <FormRow
            type="email"
            labelText="email"
            name="email"
            defaultValue={email}
          />

          <FormRow
            type="text"
            labelText="location"
            name="location"
            defaultValue={location}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
