import fs from 'fs'
import path from 'path'
import { Request } from 'express'
import createHttpError from 'http-errors'
import multer, { StorageEngine, FileFilterCallback } from 'multer'
import { nanoid, alphabetLowerCaseLetters } from '../utils/nanoid.util'

type MulterFile = Express.Multer.File

const imageStorage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: MulterFile, cb: (error: Error | null, destination: string) => void) => {
    const directory = './uploads/posts'
    fs.mkdirSync(directory, { recursive: true })
    cb(null, directory)
  },
  filename: (req: Request, file: MulterFile, cb: (error: Error | null, filename: string) => void) => {
    const uniqueName = nanoid(alphabetLowerCaseLetters, 16) + path.extname(file.originalname)
    cb(null, uniqueName)
  },
})

const fileFilter = (req: Request, file: MulterFile, cb: FileFilterCallback): void => {
  const ext = path.extname(file.originalname)
  const allowedMimeTypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  if (allowedMimeTypes.includes(ext)) {
    cb(null, true)
  } else {
    cb(createHttpError.BadRequest('The submitted image format is not correct'))
  }
}

const pictureMaxSize = 6 * 1000 * 1000 // 1MB

export const uploadPostImage = multer({
  storage: imageStorage,
  fileFilter,
  limits: { fileSize: pictureMaxSize },
})
