import mongoose, { Schema } from "mongoose";

const cartsCollection = "carts";

const CartSchema = new Schema({
  
	products: [
		{
			_id: {type: Schema.Types.ObjectId, ref: "products"},
			quantity: {type: Schema.Types.Number},
		}
	],
  status: { type: Schema.Types.Boolean, default: true },
});

//CartSchema.pre("findOne", function () {
  //this.populate(["products._id"]);
//});

export default mongoose.model(cartsCollection, CartSchema);
