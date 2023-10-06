import { Form, redirect, useNavigation, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils/customFetch"
import { Logo, FormRow } from "../components"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"

// OnSubmit handler for the register form
// eslint-disable-next-line react-refresh/only-export-components
export const registerFormHandler = async ({ request }) => {
  // Collects the data from the inputs
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  // Sends the request to the backend
  try {
    await customFetch.post("/users/register", data)
    toast.success("User created")
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data?.error)
    return error.message
  }
}

const Register = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow type="text" name="name" labelText="First Name" />
        <FormRow type="text" name="lastName" labelText="Last name" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
