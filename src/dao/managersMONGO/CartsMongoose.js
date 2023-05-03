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
	//return productDocument.map(document => ({
	//	id: document._id,
	//	title: document.title,
	//	description: document.description,
	//	category: document.category,
	//	price: document.price,
	//	thumbnail: document.thumbnail.map(imgs => imgs),
	//	code: document.code,
	//	status: document.status
	//	
	//}));
	}

	async create()
	{
		const cartDocument = await cartSchema.create({});

		return cartDocument;
		//return {
		// id: productDocument._id,
		// title: productDocument.title,
		// description: productDocument.description,
		// category: productDocument.category,
		// price: productDocument.price,
		// thumbnail: productDocument.thumbnail.map(imgs => imgs),
		// code: productDocument.code,
		// stock: productDocument.stock,
		// status: productDocument.status
		//
	}

//async updateOne(id, data)
//{
//	const productDocument = await productSchema
//		.findOneAndUpdate({ code: code }, data, { new: true});
//
//	if(!productDocument)
//	{
//		throw new Error("Product don't exist.");
//	}
//
//	return {
//		id: productDocument._id,
//		title: productDocument.title,
//		description: productDocument.description,
//		category: productDocument.category,
//		price: productDocument.price,
//		thumbnail: productDocument.thumbnail.map(imgs => imgs),
//		code: productDocument.code,
//		stock: productDocument.stock,
//		status: productDocument.status,
//	}
//}

	async deleteOne(id)
	{
		return cartSchema.deleteOne({ _id: id });
	}
}

export default CartsMongoose;


