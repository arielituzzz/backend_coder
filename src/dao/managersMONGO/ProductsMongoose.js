import productSchema from "../models/ProductSchema.js";

class ProductsMongoose
{
	async find()
	{
		const productsDocuments = await productSchema.find();

		return productsDocuments.map(document => ({
			id: document._id,
			title: document.title,
			description: document.description,
			category: document.category,
			price: document.price,
			thumbnail: document.thumbnail.map(imgs => imgs),
			code: document.code,
			status: document.status
			
		}));
	}

	async getOne(code)
	{
		const productDocument = await productSchema
			.findOne({ code: code });

		if(!productDocument)
		{
			throw new Error("Product don't exist.");
		}
	return productDocument;
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

	async create(data)
	{
		const productDocument = await productSchema.create(data);

		return {
			id: productDocument._id,
			title: productDocument.title,
			description: productDocument.description,
			category: productDocument.category,
			price: productDocument.price,
			thumbnail: productDocument.thumbnail.map(imgs => imgs),
			code: productDocument.code,
			stock: productDocument.stock,
			status: productDocument.status
		}
	}

	async updateOne(code, data)
	{
		const productDocument = await productSchema
			.findOneAndUpdate({ code: code }, data, { new: true});

		if(!productDocument)
		{
			throw new Error("Product don't exist.");
		}

		return {
			id: productDocument._id,
			title: productDocument.title,
			description: productDocument.description,
			category: productDocument.category,
			price: productDocument.price,
			thumbnail: productDocument.thumbnail.map(imgs => imgs),
			code: productDocument.code,
			stock: productDocument.stock,
			status: productDocument.status,
		}
	}

	async deleteOne(code)
	{
		return productSchema.deleteOne({ code: code });
	}
}

export default ProductsMongoose;


