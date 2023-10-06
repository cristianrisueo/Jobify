import { Form, redirect, Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils/customFetch"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo, FormRow, SubmitBtn } from "../components"

// eslint-disable-next-line react-refresh/only-export-components
export const loginFormHandler = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  // Sends the request to the backend
  try {
    await customFetch.post("/users/login", data)
    toast.success("Login Successfull")
    return redirect("/dashboard")
  } catch (error) {
    toast.error(error?.response?.data?.error)
    return error.message
  }
}

const Login = () => {
  const navigate = useNavigate()

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    }

    try {
      await customFetch.post("/users/login", data)
      toast.success("Take a test drive!!")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error?.response?.data?.error)
      return error.message
    }
  }

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>

        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />

        <SubmitBtn formBtn />
        <button type="submit" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>

        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
