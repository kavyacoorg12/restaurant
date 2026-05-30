import { AddRestaurantUseCase } from "../../application/usecases/AddRestaurantUseCase";
import { DeleteRestaurantUseCase } from "../../application/usecases/DeleteRestaurantUseCase";
import { GetAllRestaurantUseCase } from "../../application/usecases/getAllRestaurantUseCase";
import { GetSignedUrlsUseCase } from "../../application/usecases/getSignedUrlUseCase";
import { UpdateRestaurantUseCase } from "../../application/usecases/updateRestaurantUseCase";
import { RestaurantController } from "../../interface/controller/restaurantController";
import { S3Storage } from "../fileStorage/s3Storage";
import { RestaurantRepository } from "../repositories/restaurantRepository";

const restaurantRepo=new RestaurantRepository()
const addRestaurantUseCase=new AddRestaurantUseCase(restaurantRepo)
const updateRestaurantUseCase=new UpdateRestaurantUseCase(restaurantRepo)
const deleteRestaurantUseCase=new DeleteRestaurantUseCase(restaurantRepo)
const getAllRestaurantsUseCase=new GetAllRestaurantUseCase(restaurantRepo)
const s3Storage=new S3Storage()
const getSignedUrlUseCase=new GetSignedUrlsUseCase(s3Storage)
export const restaurantsController=new RestaurantController(getAllRestaurantsUseCase,addRestaurantUseCase,updateRestaurantUseCase,deleteRestaurantUseCase,getSignedUrlUseCase)