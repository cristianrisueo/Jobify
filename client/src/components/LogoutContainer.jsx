import { useState } from "react"
import { useDashboardContext } from "../hooks/useDashboardContext"
import Wrapper from "../assets/wrappers/LogoutContainer"
import { FaUserCircle, FaCaretDown } from "react-icons/fa"

const LogoutContainer = () => {
  const { user, logoutUser } = useDashboardContext()
  const [showLogout, setShowLogout] = useState(false)
  
  return (
    <Wrapper>
      <button
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>

      <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
        <button className="dropdown-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </Wrapper>
  )
}

export default LogoutContainer
