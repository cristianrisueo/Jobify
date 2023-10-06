import { Outlet } from "react-router-dom"
import { DashboardProvider } from "../context/DashboardContext"
import { JobsProvider } from "../context/JobsContext"
import { BigSidebar, NavBar, SmallSidebar } from "../components"
import Wrapper from "../assets/wrappers/Dashboard"

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <JobsProvider>
        <Wrapper>
          <main className="dashboard">
            <SmallSidebar />
            <BigSidebar />

            <div>
              <NavBar />
              <div className="dashboard-page">
                <Outlet />
              </div>
            </div>
          </main>
        </Wrapper>
      </JobsProvider>
    </DashboardProvider>
  )
}

export default DashboardLayout
