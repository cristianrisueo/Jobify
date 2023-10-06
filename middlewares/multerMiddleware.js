import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the directory where uploaded files will be stored
    cb(null, "public/uploads")
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname // Use the original file name
    cb(null, fileName) // Set the name of the uploaded file to the original file name
  },
})

const upload = multer({ storage })

export default upload
