import ProductManager from "../dao/managersMONGO/ProductManager.js";

class ProductController
{
	static list = async  (req, res) =>
	{
		const manager = new ProductManager();

		const products = await manager.find();
		res.send({ status: 'success', products });
	};
}

export const getOne = async (req, res) =>
{
	const { pid } = req.params;

	const manager = new ProductManager();

	const product = await manager.getOne(pid);
	res.send({ status: 'success', product });
};

export const save = async (req, res) =>
{	

	const manager = new ProductManager();
	const product = await manager.create(req.body);

	res.send({ status: 'success', product, message: 'Product created.' })
};

export const update = async (req, res) =>
{
	const { pid } = req.params;

	const manager = new ProductManager();

	const result = await manager.updateOne(pid, req.body);

	res.send({ status: 'success', result, message: 'Product updated.' })
};

export const deleteOne = async (req, res) =>
{
	const { pid } = req.params;

	const manager = new ProductManager();

	const product = await manager.deleteOne(pid);
	res.send({ status: 'success', message: 'Product deleted.' })
};

export const addToCart = async (req, res) =>
{
	try{
		const { pid, cid } = req.params;

		const manager = new ProductManager();

		const cart = await manager.addProductToCart(pid, cid);
		res.send({ status: 'success', cart, message: 'Cart updated.' });

	}catch(err){
		return err;
	}
};

export const productDisabled = async (req, res) =>
{
	try{
	const { pid } = req.params;

	const manager = new ProductManager();

	const product = await manager.productDisabled(pid);

	res.send({ status: 'success', product, message: 'Product disabled.' });
	}catch(err){
		return err;
	}
};

export const productEnabled = async (req, res) =>
{
	try{
	const { pid } = req.params;

	const manager = new ProductManager();

	const product = await manager.productEnabled(pid);

	res.send({ status: 'success', product, message: 'Product enabled.' });
	}catch(err){
		return err;
	}	
};

export default ProductController;
