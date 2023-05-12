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

	async updateQuantity(cid,pid, quantity)
	{
    return await this.carts.updateQuantity(cid,pid,quantity);		
	}


	async updateOne(id, data)
	{
		return this.products.updateOne(id, data);
	}

	async deleteOneProduct(cid, pid)
	{
			return this.carts.deleteOneProduct(cid, pid);	
	}

	async deleteAllProducts	(cid)
	{
		return this.carts.deleteAllProducts(cid);
	}

}

export default CartManager;
