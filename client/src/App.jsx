import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages"
import { registerFormHandler } from "./pages/Register"
import { loginFormHandler } from "./pages/Login"
import { dashboardLoader, submitJobFormHandler } from "./pages/AddJob"
import { editJobAction, editJobLoader } from "./pages/EditJob"
import { adminLoader } from "./pages/Admin"
import { profileAction } from "./pages/Profile"
import { statsLoader } from "./pages/Stats"
import { AllJobsLoader } from "./pages/AllJobs"

// Router of the app
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerFormHandler, // Action executed onSubmit the form
      },
      { path: "login", element: <Login />, action: loginFormHandler },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: submitJobFormHandler,
            loader: dashboardLoader,
          }, // Provides a context to the route before rendering
          { path: "stats", element: <Stats />, loader: statsLoader },
          { path: "all-jobs", element: <AllJobs />, loader: AllJobsLoader },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "profile", element: <Profile />, action: profileAction },
          { path: "admin", element: <Admin />, loader: adminLoader },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
