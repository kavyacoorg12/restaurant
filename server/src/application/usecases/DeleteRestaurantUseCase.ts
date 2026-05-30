import { AppError } from "../../domain/errors/appError";
import { IRestaurantRepository } from "../../domain/repositoryInterface/IRestaurantRepository";
import { restaurantMessages } from "../../shared/constants/RestaurantMessage";
import { HttpStatus } from "../../shared/enum/httpStatus";
import { IDeleteRestaurantUseCase } from "../interface/IDeleteRestaurantUseCase";

export class DeleteRestaurantUseCase implements IDeleteRestaurantUseCase {
  constructor(private _restaurantRepo: IRestaurantRepository) {}

  async execute(restaurantId: string): Promise<void> {
    const existing = await this._restaurantRepo.findById(restaurantId);
    if (!existing) {
      throw new AppError(
        restaurantMessages.ERROR.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this._restaurantRepo.delete(restaurantId);
  }
}
