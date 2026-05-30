import { Restaurant } from "../../domain/entities/restaurants";
import { IRestaurantDto } from "../dtos/restaurant";

export function getAllRestaurantDto(data:Restaurant):IRestaurantDto
{
  return{
    id:data.id,
    img:data.img,
    name:data.name,
    address:data.address,
    contactInfo:data.contactInfo,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  }
}