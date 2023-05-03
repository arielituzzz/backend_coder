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
	const { code } = req.params;

	const manager = new ProductManager();

	const product = await manager.getOne(code);
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
	const { code } = req.params;

	const manager = new ProductManager();

	const result = await manager.updateOne(code, req.body);

	res.send({ status: 'success', result, message: 'Product updated.' })
};

export const deleteOne = async (req, res) =>
{
	const { id } = req.params;

	const manager = new ProductManager();

	const product = await manager.deleteOne(id);
	res.send({ status: 'success', message: 'Product deleted.' })
};

// export const addCourse = async (req, res) =>
//
// const { sid, cid } = req.params;
//
// const manager = new StudentManager();
//
// const student = await manager.addCourse(sid, cid);
// res.send({ status: 'success', student, message: 'Student updated.' })
//;

export default ProductController;
