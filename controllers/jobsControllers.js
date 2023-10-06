import { StatusCodes } from "http-status-codes"
import Jobs from "../models/jobsModel.js"
import mongoose from "mongoose"
import day from "dayjs"

// Creates a new job attaching it to one specific user
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const newJob = await Jobs.create(req.body)

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Job created successfully", job: newJob })
}

// Gets all jobs created by one specific user
export const getJobs = async (req, res) => {
  const { search, status, type, sort } = req.query

  const query = {
    createdBy: req.user.userId,
  }

  // Like %value query to moongose for position and company
  if (search)
    query.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ]

  // Status and Type
  if (status && status !== "All") query.status = status
  if (type && type !== "All") query.type = type

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "postion",
    "z-a": "-position",
  }

  // Pagination
  const page = Number(req.query.page) || 1 // Number of page
  const limit = Number(req.query.limit) || 10 // Number of jobs to display
  const skip = (page - 1) * limit // Number of jobs to skip

  // Count of jobs, number of pages and jobs
  const totalJobs = await Jobs.countDocuments(query)
  const numPages = Math.ceil(totalJobs / limit)
  const jobs = await Jobs.find(query)
    .sort(sortOptions[sort] || sortOptions.newest)
    .skip(skip)
    .limit(limit)

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages: numPages, currentPage: page, jobs })
}

// Gets a job filtering by its ID
export const getJobById = async (req, res) => {
  const foundJob = await Jobs.findById(req.params.id)
  res.status(StatusCodes.OK).json(foundJob)
}

export const editJob = async (req, res) => {
  const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res
    .status(StatusCodes.OK)
    .json({ msg: "Job updated successfully", updatedJob })
}

export const deleteJob = async (req, res) => {
  const deletedJob = await Jobs.findByIdAndDelete(req.params.id)

  res
    .status(StatusCodes.OK)
    .json({ msg: `Job with id ${deletedJob.id} found and deleted.` })
}

export const showStats = async (req, res) => {
  let stats = await Jobs.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count

    return acc
  }, {})

  const defaultStats = {
    pending: stats.Pending || 0,
    interview: stats.Interview || 0,
    declined: stats.Declined || 0,
  }

  let monthlyApplications = await Jobs.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY")

      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
