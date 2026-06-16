import { NextFunction, Request, Response } from "express"
import { AppError } from "../../domain/errors/appError"
import { generalMessages } from "../../shared/constants/generalMessage"
import { HttpStatus } from "../../shared/enum/httpStatus"


export const restaurantInputValidation=(req:Request,res:Response,next:NextFunction)=>{
  const {img,name,address,contactInfo}=req.body

  if(!img||!name||!address||!contactInfo)
  {
    throw new AppError(generalMessages.ERROR.BAD_REQUEST,HttpStatus.BAD_REQUEST)
  }

  if(name.trim()===''||address.trim()===''||contactInfo.trim()==='')
  {
    throw new AppError(`empty space is not allowed`,HttpStatus.BAD_REQUEST)
  }
  if(name.length<3 || name.length>20)
  {
    throw new AppError("Restaurant name must be between 3 and 20 characters",HttpStatus.BAD_REQUEST
)
  }

  if (address.length < 5 || address.length > 100) {
  throw new AppError(
    "Address must be between 5 and 100 characters",
    HttpStatus.BAD_REQUEST
  );
}

if (
  contactInfo.length < 10 ||
  contactInfo.length > 15
) {
  throw new AppError(
    "Contact info must be between 10 and 15 characters",
    HttpStatus.BAD_REQUEST
  );
}
const phoneRegex = /^[0-9]{10}$/;

if (!phoneRegex.test(contactInfo)) {
  throw new AppError(
    "Invalid contact number",
    HttpStatus.BAD_REQUEST
  );
}

next()
}

export const restaurantUpdateValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { img, name, address, contactInfo } = req.body;

  if (name !== undefined) {
    if (name.trim() === "") {
      throw new AppError(
        "Restaurant name cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    if (name.length < 3 || name.length > 20) {
      throw new AppError(
        "Restaurant name must be between 3 and 20 characters",
        HttpStatus.BAD_REQUEST
      );
    }
  }


  if (address !== undefined) {
    if (address.trim() === "") {
      throw new AppError(
        "Address cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    if (address.length < 5 || address.length > 100) {
      throw new AppError(
        "Address must be between 5 and 100 characters",
        HttpStatus.BAD_REQUEST
      );
    }
  }


  if (contactInfo !== undefined) {

    if (contactInfo.trim() === "") {
      throw new AppError(
        "Contact info cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }


    if (
      contactInfo.length < 10 ||
      contactInfo.length > 15
    ) {
      throw new AppError(
        "Contact info must be between 10 and 15 characters",
        HttpStatus.BAD_REQUEST
      );
    }


    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(contactInfo)) {
      throw new AppError(
        "Invalid contact number",
        HttpStatus.BAD_REQUEST
      );
    }
  }


  if (img !== undefined && img.trim() === "") {
    throw new AppError(
      "Image cannot be empty",
      HttpStatus.BAD_REQUEST
    );
  }


  next();
};