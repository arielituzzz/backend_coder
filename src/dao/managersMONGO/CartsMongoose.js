import cartSchema from "../models/CartSchema.js";


class CartsMongoose
{
	async find()
	{
		const cartsDocuments = await cartSchema.find();

		return cartsDocuments.map(document => ({
			_id: document._id,
			products: document.products,
			status: document.status

		}));
	}

	async getOne(id)
	{
		const cartDocument = await cartSchema
			.findOne({ _id: id });

		if(!cartDocument)
		{
			throw new Error("Cart don't exist.");
		}
		return cartDocument;
	}

	async create()
	{
		const cartDocument = await cartSchema.create({});

		return cartDocument;
	}

	async updateQuantity(cid, pid, quantity)
	{

		const cart = await cartSchema.findOne(
			{ _id: cid }      
		);

		const product = cart.products.find(
		(prod) => prod._id == pid
		);

		if(!cart || !product)
		{
			throw new Error("Cart or product don't exist.");
		}

		product.quantity = quantity;

		await cartSchema.updateOne(
			{ _id: cid }, { $set: { products: cart.products }}, { new: true  }
		)
		
		return product;

	}

	async updateOne(id, data)
	{
		try
		{

			const newProduct = {_id: data._id, quantity: 1} 



			return await cartSchema
				.findOneAndUpdate({ _id: id },{products: data}, { new: true});

		}catch{
			throw new Error("Cart don't exist.");
		}
	}

	async deleteOneProduct(cid, pid)
	{

		const product = await cartSchema.updateOne({ _id: cid }, { $pull: { products: { _id: pid }  } });	
		if(!product)
		{
			throw new Error("Cart or product don't exist.");
		}

		return product;
	}

	async deleteAllProducts(cid)
	{
		const result = await cartSchema.updateOne(
			{ _id: cid },
			{ $set: { products: [] } }
		);
		if(!result)
		{
			throw new Error("Cart don't exist.");
		}
		return result;
	}



}

export default CartsMongoose;


