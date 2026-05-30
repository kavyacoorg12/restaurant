import type { BackendResponse } from "./api"
import type { IRestaurantDto } from "./restaurantDto"

export interface IAddRestaurantInput{
    img:string
  name:string,
  address:string,
  contactInfo:string
}

export interface IGetAllRestaurantsOutputData{
  restaurants:IRestaurantDto[],
  nextCursor:string|null
}
export interface IUpdateRestaurantInput{
    img?:string
  name?:string,
  address?:string,
  contactInfo?:string
}

export type IGetAllRestaurantsOutput = BackendResponse<IGetAllRestaurantsOutputData>;
