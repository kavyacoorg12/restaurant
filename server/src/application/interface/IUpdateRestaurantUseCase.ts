import { IUpdateRestaurantInput } from "../interfaceType/restaurants";

export interface IUpdateRestaurantUseCase
{
  execute(restaurantId:string,data:IUpdateRestaurantInput):Promise<void>
}