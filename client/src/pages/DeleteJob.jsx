import { redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils/customFetch"

// eslint-disable-next-line react-refresh/only-export-components
export async function deleteJobAction({ params }) {
  console.log("HOAL?")
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success("Job deleted successfully")
  } catch (error) {
    toast.error("ERROR" + error.response.data.error)
  }

  return redirect("/dashboard/all-jobs")
}
