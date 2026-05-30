import { IRestaurantRepository } from "../../domain/repositoryInterface/IRestaurantRepository";
import { IGetAllRestaurantsUseCase } from "../interface/IGetRestaurantsUseCase";
import { IGetAllRestaurantsOutput } from "../interfaceType/restaurants";
import { getAllRestaurantDto } from "../mapper/restaurant";

export class GetAllRestaurantUseCase implements IGetAllRestaurantsUseCase {
  constructor(private _restaurantRepo: IRestaurantRepository) {}
  async execute(
    cursor: string | null,
    limit: string,
  ): Promise<IGetAllRestaurantsOutput> {
    const data = await this._restaurantRepo.findAllRestaurants(cursor, limit);

    return {
      restaurants: data.restaurants.map((res) => getAllRestaurantDto(res)),
      nextCursor: data.nextCursor,
    };
  }
}
