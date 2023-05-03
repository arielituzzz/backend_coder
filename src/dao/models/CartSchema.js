import mongoose, { Schema } from "mongoose";

const cartsCollection = 'carts';


const CartSchema = new Schema({
	products: { type: Schema.Types.Array, default: [] },
	status: { type: Schema.Types.Boolean, default: true }
});

export default mongoose.model(cartsCollection, CartSchema);
