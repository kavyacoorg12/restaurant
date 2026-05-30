import { IAddRestaurantInput } from "../interfaceType/restaurants";

export interface IAddRestaurantUseCase{
  execute(data:IAddRestaurantInput):Promise<void>
}