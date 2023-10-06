import { useDashboardContext } from "../hooks/useDashboardContext"
import Wrapper from "../assets/wrappers/ThemeToggle"
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs"

const ThemeToggle = () => {
  const { darkTheme, toggleDarkTheme } = useDashboardContext()

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {darkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  )
}

export default ThemeToggle
