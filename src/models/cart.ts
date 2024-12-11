import mongoose, { Schema, Document } from 'mongoose';
import Product from './product';
import User from './user';

interface IProduct {
    productId: number;
    quantity: number;
}

interface ICart extends Document {
    id: number;
    userId: number;
    date: Date;
    products: IProduct[];
}

const cartSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.Number,
        ref: User,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.Number,
                ref: Product,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;