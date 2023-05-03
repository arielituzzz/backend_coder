import mongoose, { Schema } from "mongoose";

const productsCollection = 'products';


const ProductSchema = new Schema({
	title: { type: Schema.Types.String, require: true },
	description: { type: Schema.Types.String, require: true },
	category: { type: Schema.Types.String, require: true },
	price: { type: Schema.Types.Number, require: true },
	thumbnail: { type: Schema.Types.Array, default: [] },
	code: { type: Schema.Types.String, require: true },
	stock: { type: Schema.Types.Number, require: true },
	status: { type: Schema.Types.Boolean, default: true }
});

export default mongoose.model(productsCollection, ProductSchema);
