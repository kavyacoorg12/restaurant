import mongoose, { Document, Model, Schema, Types } from "mongoose"

export type RestaurantDoc=Document&{
  _id:Types.ObjectId,
  img:string
  name:string,
  address:string,
  contactInfo:string,
  createdAt:Date,
  updatedAt:Date
}

export const RestaurantSchema=new Schema<RestaurantDoc>({
 img:{type:String,required:true},
 name:{type:String,required:true,trim:true},
 address:{type:String,required:true,trim:true},
 contactInfo:{type:String,required:true,trim:true} 
},{timestamps:true})
RestaurantSchema.index(
  { name: 1, address: 1 },
  { unique: true }
);

export const RestaurantModel:Model<RestaurantDoc>=mongoose.models.Restaurant||mongoose.model<RestaurantDoc>("Restaurant",RestaurantSchema)