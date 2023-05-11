import ProductsMongoose from "./ProductsMongoose.js";
import CartsMongoose from "./CartsMongoose.js";

class CartManager
{
	constructor()
	{
		this.carts = new CartsMongoose();
		
	}

	async find()
	{
		return this.carts.find();
	}

	async getOne(id)
	{
		return this.carts.getOne(id);
	}

	async create()
	{
		return await this.carts.create();
	}

	async updateOne(id, data)
	{
		return this.products.updateOne(id, data);
	}

	async deleteOne(id)
	{
		return this.products.deleteOne(id);
	}

}

export default CartManager;
