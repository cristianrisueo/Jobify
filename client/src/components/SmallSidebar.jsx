import { useDashboardContext } from "../hooks/useDashboardContext"
import Wrapper from "../assets/wrappers/SmallSidebar"
import { FaTimes } from "react-icons/fa"
import Logo from "./Logo"
import NavLinks from "./NavLinks"

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
