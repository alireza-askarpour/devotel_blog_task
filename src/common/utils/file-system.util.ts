import fs from 'fs'
import { join, resolve } from 'path'

export const deleteFileIfExist = (filePath: string) => {
  if (filePath) {
    const pathFile = join(resolve(), filePath)
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
  }
}
