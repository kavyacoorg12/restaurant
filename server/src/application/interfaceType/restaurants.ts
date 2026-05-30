import { IRestaurantDto } from "../dtos/restaurant"

export interface IAddRestaurantInput{
    img:string
  name:string,
  address:string,
  contactInfo:string
}

export interface IGetAllRestaurantsOutput{
  restaurants:IRestaurantDto[],
  nextCursor:string|null
}
export interface IUpdateRestaurantInput{
    img?:string
  name?:string,
  address?:string,
  contactInfo?:string
}