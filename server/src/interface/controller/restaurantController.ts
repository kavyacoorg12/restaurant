import { NextFunction, Request, Response } from "express";
import { IGetAllRestaurantsUseCase } from "../../application/interface/IGetRestaurantsUseCase";
import { IAddRestaurantUseCase } from "../../application/interface/IAddRestaurantsUseCase";
import { IUpdateRestaurantUseCase } from "../../application/interface/IUpdateRestaurantUseCase";
import { IDeleteRestaurantUseCase } from "../../application/interface/IDeleteRestaurantUseCase";
import { HttpStatus } from "../../shared/enum/httpStatus";
import { restaurantMessages } from "../../shared/constants/RestaurantMessage";
import { AppError } from "../../domain/errors/appError";
import { generalMessages } from "../../shared/constants/generalMessage";
import { IGetSignedUploadUrlsUseCase } from "../../application/interface/IGetSignedUrlUseCase";
import { Error } from "mongoose";
export class RestaurantController {
  constructor(
    private _getAllRestaurantUseCase: IGetAllRestaurantsUseCase,
    private _addRestaurantsUseCase: IAddRestaurantUseCase,
    private _updateRestaurantUseCase: IUpdateRestaurantUseCase,
    private _deleteRestaurantUseCase: IDeleteRestaurantUseCase,
    private _getSignedUrlUseCase:IGetSignedUploadUrlsUseCase
  ) {}

  getAllRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { cursor = null, limit = "10" } = req.query;

      const result = await this._getAllRestaurantUseCase.execute(
        cursor as string | null,
        limit as string,
      );

      res.status(HttpStatus.OK).json({
        success: true,
        data: result,
        message: restaurantMessages.SUCCESS.FETCHED,
      });
    } catch (err) {
      console.log(err);
      next(err)
    }
  };
  addRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await this._addRestaurantsUseCase.execute(data);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: restaurantMessages.SUCCESS.CREATED,
      });
    } catch (err) {
      console.log(err);
      next(err)
    }
  };
  updateRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const restaurantId = req.params.restaurantId as string;
      const data = req.body;
      if (!restaurantId) {
        throw new AppError(
          generalMessages.ERROR.BAD_REQUEST,
          HttpStatus.BAD_REQUEST,
        );
      }
      await this._updateRestaurantUseCase.execute(restaurantId, data);
      res.status(HttpStatus.OK).json({
        success: true,
        messege: restaurantMessages.SUCCESS.UPDATED,
      });
    } catch (err) {
      console.log(err);
      next(err)
    }
  };
  deleteRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const restaurantId = req.params.restaurantId as string;
      if (!restaurantId) {
        throw new AppError(
          generalMessages.ERROR.BAD_REQUEST,
          HttpStatus.BAD_REQUEST,
        );
      }
      await this._deleteRestaurantUseCase.execute(restaurantId);
      res.status(HttpStatus.OK).json({
        success: true,
        messege: restaurantMessages.SUCCESS.DELETED,
      });
    } catch (err) {next(err)}
  };
   getSignedUploadUrl = async (req: Request, res: Response): Promise<void> => {
    const { files } = req.body;
    const data = await this._getSignedUrlUseCase.execute(files);
    res.status(HttpStatus.OK).json({
      success: true,
      message: restaurantMessages.SUCCESS.SIGNED_URL_FETCHED,
      data,
    });
  };
}
