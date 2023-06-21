import mongoose, { Schema } from "mongoose";

const cartsCollection = "carts";

const CartSchema = new Schema({
  products: { type: Schema.Types.Array, ref: "products", default: [] },
  status: { type: Schema.Types.Boolean, default: true },
});

CartSchema.pre("findOne", function () {
  this.populate(["products"]);
});

export default mongoose.model(cartsCollection, CartSchema);
