import mongoose from 'mongoose'
const { Schema } = mongoose;

/**
 * @module ProductModel
 * 
 * @description
 * Mongoose schema for the Product model. This schema defines the structure of the product documents
 * that will be stored in the MongoDB database.
 * 
 * @property {number} id 
 * @property {string} title
 * @property {number} price 
 * @property {string} [description] 
 * @property {string} [image] 
 * @property {string} [category] 
 */
const productSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:String,
    image:String,
    category:String
})

export default mongoose.model('product', productSchema);