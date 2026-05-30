import { AppError } from "../../domain/errors/appError";
import { IRestaurantRepository } from "../../domain/repositoryInterface/IRestaurantRepository";
import { restaurantMessages } from "../../shared/constants/RestaurantMessage";
import { HttpStatus } from "../../shared/enum/httpStatus";
import { IAddRestaurantUseCase } from "../interface/IAddRestaurantsUseCase";
import { IAddRestaurantInput } from "../interfaceType/restaurants";

export class AddRestaurantUseCase implements IAddRestaurantUseCase {
  constructor(private _restaurantRepo: IRestaurantRepository) {}
  async execute(data: IAddRestaurantInput): Promise<void> {
    const existing = await this._restaurantRepo.isDuplicateRestaurant(
      data.name,
      data.address,
    );
    if (existing) {
      throw new AppError(
        restaurantMessages.ERROR.ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    await this._restaurantRepo.create(data);
  }
}
