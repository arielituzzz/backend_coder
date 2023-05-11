import CartManager from "../dao/managersMONGO/CartManager.js";

class CartController
{
	static list = async  (req, res) =>
	{
		const manager = new CartManager();

		const carts = await manager.find();
		res.send({ status: 'success', carts });
	};
}

export const getOne = async (req, res) =>
{
	const { cid } = req.params;

	const manager = new CartManager();

	const cart = await manager.getOne(cid);
	res.send({ status: 'success', cart });
};

export const save = async (req, res) =>
{
	const manager = new CartManager();
	const cart = await manager.create();

	res.send({ status: 'success', cart, message: 'Cart created.' })
};

export const update = async (req, res) =>
{
	const { cid } = req.params;

	const manager = new CartManager();

	const result = await manager.updateOne(cid, req.body);

	res.send({ status: 'success', result, message: 'Cart updated.' })
};

export const deleteOne = async (req, res) =>
{
	const { cid } = req.params;

	const manager = new CartManager();

	const cart = await manager.deleteOne(cid);
	res.send({ status: 'success', message: 'Cart deleted.' })
};


export default CartController;
