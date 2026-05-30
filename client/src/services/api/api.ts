import { apiRoute } from "../../constants/apiRouter"
import type { BackendResponse } from "../../types/api"
import type { IAddRestaurantInput, IGetAllRestaurantsOutput, IUpdateRestaurantInput } from "../../types/restaurantType"
import api, { axiosWrapper } from "../axiosWrapper"

export const restaurantApi={
  addRestaurant:async(data:IAddRestaurantInput)=>{
   return await axiosWrapper<BackendResponse>(api.post(apiRoute.addRestaurant,data))
  },
  getRestaurants:async(cursor:string|null,limit:number)=>{
    const params={
     ...(cursor&&{cursor}),
     limit
    }
    return await axiosWrapper<IGetAllRestaurantsOutput>(api.get(apiRoute.getRestaurants,{params}))
  },
  updateRestaurant:async(restaurantId:string,data:IUpdateRestaurantInput)=>{
    return await axiosWrapper<BackendResponse>(api.patch(apiRoute.updateRestaurant.replace(':restaurantId',restaurantId),data))
  },
  deleteRestaurant:async(restaurantId:string)=>{
    return await axiosWrapper<BackendResponse>(api.delete(apiRoute.deleteRestaurant.replace(':restaurantId',restaurantId)))
  }

}