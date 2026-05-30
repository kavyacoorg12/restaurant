import { Types } from "mongoose";
import { Restaurant } from "../../domain/entities/restaurants";
import { IRestaurantRepository } from "../../domain/repositoryInterface/IRestaurantRepository";
import { RestaurantDoc, RestaurantModel } from "../database/models/restaurants";

export class RestaurantRepository implements IRestaurantRepository {
  async create(
    data: Omit<Restaurant, "id" | "createdAt" | "updatedAt">,
  ): Promise<Restaurant> {
    const doc = await RestaurantModel.create(data);
    return this.map(doc);
  }
  async updateInfo(
    restaurantId: string,
    data: Partial<Restaurant>,
  ): Promise<boolean> {
    const doc = await RestaurantModel.findByIdAndUpdate(restaurantId, data, {
      new: true,
    });
    return !!doc;
  }
  async findAllRestaurants(
    cursor: string | null,
    limit: string,
  ): Promise<{ restaurants: Restaurant[]; nextCursor: string | null }> {
    const parsedLimit = Number(limit);
    const query = cursor ? { _id: { $gt: new Types.ObjectId(cursor) } } : {};
    const docs = await RestaurantModel.find(query)
      .sort({ _id: 1 })
      .limit(parsedLimit + 1);

    let nextCursor: string | null = null;
    if (docs.length > parsedLimit) {
      const nextDoc = docs.pop();
      nextCursor = nextDoc!._id.toString();
    }
    {
    }
    return {
      restaurants: docs.map((doc) => this.map(doc)),
      nextCursor: nextCursor,
    };
  }
  async delete(restaurantId: string): Promise<boolean> {
    const deleted = await RestaurantModel.findByIdAndDelete(restaurantId);
    return !!deleted;
  }

  async isDuplicateRestaurant(name: string, address: string, excludeId?: string): Promise<boolean> {
     const query:{
      name:string,
      address:string,
      _id?:{$ne:string}
     }={
      name,
      address
     }

     if(excludeId)
     {
      query._id={$ne:excludeId}
     }
     const existing=await RestaurantModel.findOne(query)
     return !!existing
  }
  async findById(restaurantId: string): Promise<Restaurant|null> {
    const doc=await RestaurantModel.findById(restaurantId)
    return doc?this.map(doc):null
  }
  private map(doc: RestaurantDoc): Restaurant {
    return {
      id: doc._id.toString(),
      img: doc.img,
      name: doc.name,
      address: doc.address,
      contactInfo: doc.contactInfo,
      createdAt:doc.createdAt,
      updatedAt:doc.updatedAt
    };
  }
}
