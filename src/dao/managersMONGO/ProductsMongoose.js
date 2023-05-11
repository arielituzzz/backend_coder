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

	async getOne(id)
	{
		const productDocument = await productSchema
			.findOne({ _id: id });

		if(!productDocument)
		{
			throw new Error("Product don't exist.");
		}
	return productDocument;
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

	async updateOne(id, data)
	{
		const productDocument = await productSchema
			.findOneAndUpdate({ _id: id }, data, { new: true});

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

	async deleteOne(id)
	{
		return productSchema.deleteOne({ _id: id });
	}
}

export default ProductsMongoose;


