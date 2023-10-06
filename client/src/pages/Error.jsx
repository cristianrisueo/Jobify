import { Link, useRouteError } from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage"
import img from "../assets/images/not-found.svg"

const Error = () => {
  // Gets the error of the route (404 or others)
  const error = useRouteError()

  return (
    <Wrapper>
      {error.status === 404 ? (
        <div>
          <img src={img} alt="Not Found" />
          <h3>Page not found!!!</h3>
          <p>The page you are looking for cant be found</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      ) : (
        <div>
          <h1>Something went wrong</h1>
          <Link to="/dashboard">Back Home</Link>
        </div>
      )}
    </Wrapper>
  )
}

export default Error
