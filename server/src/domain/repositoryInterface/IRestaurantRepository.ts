import { Restaurant } from "../entities/restaurants";

export interface IRestaurantRepository {
  create(
    data: Omit<Restaurant, "id" | "createdAt" | "updatedAt">,
  ): Promise<Restaurant>;
  updateInfo(restaurantId: string, data: Partial<Restaurant>): Promise<boolean>;
  delete(restaurantId: string): Promise<boolean>;
  findAllRestaurants(
    cursor: string | null,
    limit: string,
  ): Promise<{ restaurants: Restaurant[]; nextCursor: string | null }>;
  isDuplicateRestaurant( name: string,
  address: string,
  excludeId?: string):Promise<boolean>
  findById(restaurantId:string):Promise<Restaurant|null>
}
