import { useDashboardContext } from "../hooks/useDashboardContext"
import Logo from "./Logo"
import LogoutContainer from "./LogoutContainer"
import ThemeToggle from "./ThemeToggle"
import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft } from "react-icons/fa"

const NavBar = () => {
  const { toggleSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className="nav-center">
        <button onClick={toggleSidebar} className="toggle-btn">
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>

        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}

export default NavBar
