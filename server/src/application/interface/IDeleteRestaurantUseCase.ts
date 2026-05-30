
export interface IDeleteRestaurantUseCase
{
  execute(restaurantId:string):Promise<void>
}