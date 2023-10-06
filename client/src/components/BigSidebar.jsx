import { useDashboardContext } from "../hooks/useDashboardContext"
import Wrapper from "../assets/wrappers/BigSidebar"
import NavLinks from "./NavLinks"
import Logo from "./Logo"

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "" : "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>

          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
