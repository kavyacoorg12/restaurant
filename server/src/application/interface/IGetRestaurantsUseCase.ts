import { IGetAllRestaurantsOutput } from "../interfaceType/restaurants";

export interface IGetAllRestaurantsUseCase
{
  execute(cursor:string|null,limit:string):Promise<IGetAllRestaurantsOutput>
}