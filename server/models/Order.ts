import { Schema, models, model } from 'mongoose';
const OrderSchema=new Schema({user:{type:Schema.Types.ObjectId,ref:'User',required:true},type:{type:String,enum:['food','courier'],required:true},pickupAddress:String,dropoffAddress:String,sender:{name:String,phone:String},receiver:{name:String,phone:String},packageType:String,weight:String,packagePhotoUrl:String,distance:Number,deliveryFee:Number,status:{type:String,default:'searching'}},{timestamps:true});
export default models.Order||model('Order',OrderSchema);
