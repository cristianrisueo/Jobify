import { NavLink } from "react-router-dom"
import { useDashboardContext } from "../hooks/useDashboardContext"
import links from "../utils/Links"

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext()

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link
        const { role } = user

        if (path === "admin" && role !== "admin") return

        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
