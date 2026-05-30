import { NextFunction, Request, Response } from "express"
import { AppError } from "../../domain/errors/appError"
import { HttpStatus } from "../../shared/enum/httpStatus"

export const validateSignedUrlRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { fileType, fileSize } = req.body

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ]

  if (!fileType || !allowedTypes.includes(fileType)) {
    return next(
      new AppError("Invalid image type",HttpStatus.BAD_REQUEST)
    )
  }

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

  if (
    typeof fileSize !== "number" ||
    fileSize <= 0 ||
    fileSize > MAX_IMAGE_SIZE
  ) {
    return next(
      new AppError("Invalid file size", HttpStatus.BAD_REQUEST)
    )
  }

  next()
}