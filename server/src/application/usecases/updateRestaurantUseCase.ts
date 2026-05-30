import { AppError } from "../../domain/errors/appError";
import { IRestaurantRepository } from "../../domain/repositoryInterface/IRestaurantRepository";
import { restaurantMessages } from "../../shared/constants/RestaurantMessage";
import { HttpStatus } from "../../shared/enum/httpStatus";
import { IUpdateRestaurantUseCase } from "../interface/IUpdateRestaurantUseCase";
import { IUpdateRestaurantInput } from "../interfaceType/restaurants";

export class UpdateRestaurantUseCase implements IUpdateRestaurantUseCase {
  constructor(private _restaurantRepo: IRestaurantRepository) {}

  async execute(
    restaurantId: string,
    data: IUpdateRestaurantInput,
  ): Promise<void> {
    const restaurant = await this._restaurantRepo.findById(restaurantId);
    if (!restaurant) {
      throw new AppError(
        restaurantMessages.ERROR.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedName = data.name ?? restaurant.name;
    const updatedAddress = data.address ?? restaurant.address;
    const existing = await this._restaurantRepo.isDuplicateRestaurant(
      updatedName,
      updatedAddress,
      restaurantId,
    );
    if (existing) {
      throw new AppError(
        restaurantMessages.ERROR.ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    await this._restaurantRepo.updateInfo(restaurantId, data);
  }
}
