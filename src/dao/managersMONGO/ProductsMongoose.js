import productSchema from "../models/ProductSchema.js";

class ProductsMongoose
{

	// OBTENER TODOS LOS PRODUCTOS

	async paginate(criteria)
	{
		const { category, limit, page } = criteria;
		const productDocuments = await productSchema.paginate({ category }, { limit, page });

		productDocuments.docs = productDocuments.docs.map(document => ({

			id: document._id,
			title: document.title,
			description: document.description,
			category: document.category,
			price: document.price,
			thumbnail: document.thumbnail.map(imgs => imgs),
			code: document.code,
			status: document.status

		}));

		return productDocuments;
	}


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

	// OBTENER UN PRODUCTO POR SU ID

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

	//return {
	//	id: productDocument._id,
	//	title: productDocument.title,
	//	description: productDocument.description,
	//	category: productDocument.category,
	//	price: productDocument.price,
	//	thumbnail: productDocument.thumbnail.map(imgs => imgs),
	//	code: productDocument.code,
	//	stock: productDocument.stock,
	//	status: productDocument.status
	//}
	return data;

	}

	// ACTUALIZAR UN PRODUCTO

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

	// ELIMINAR UN PRODUCTO

	async deleteOne(id)
	{
		return productSchema.deleteOne({ _id: id });
	}


}

export default ProductsMongoose;


