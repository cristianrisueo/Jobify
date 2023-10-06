import { Link } from "react-router-dom"
import { Logo } from "../components"
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            sollicitudin porta orci, at pretium orci eleifend nec. Sed placerat
            pellentesque neque. Donec sagittis purus nec massa rhoncus, ac
            tempus erat lacinia. Mauris sit amet pharetra ligula. Nunc suscipit
            odio dui, quis pretium libero iaculis id.
          </p>

          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>

        <img src={main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
