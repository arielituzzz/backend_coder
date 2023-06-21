import CartManager from "../managersDB/CartManager.js";

class CartController {
  static list = async (req, res) => {
    const manager = new CartManager();

    const carts = await manager.find();
    res.send({ status: "success", carts });
  };
}

export const getOne = async (req, res) => {
  const { cid } = req.params;

  const manager = new CartManager();

  const cart = await manager.getOne(cid);
  res.send({ status: "success", cart });
};

export const save = async (req, res) => {
  const manager = new CartManager();
  const cart = await manager.create();

  res.send({ status: "success", cart, message: "Cart created." });
};

export const update = async (req, res) => {
  const { cid } = req.params;

  const manager = new CartManager();

  const result = await manager.updateOne(cid, req.body);

  res.send({ status: "success", result, message: "Cart updated." });
};

export const updateQuantity = async (req, res) => {
  const { cid, pid } = req.params;

  const manager = new CartManager();

  const result = await manager.updateQuantity(
    cid,
    pid,
    Number(req.body.quantity)
  );

  res.send({ status: "success", result, message: "Cart updated." });
};

export const deleteOneProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const manager = new CartManager();

    const product = await manager.deleteOneProduct(cid, pid);
    res.send({ status: "success", product, message: "Product deleted." });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    const { cid } = req.params;

    const manager = new CartManager();

    const result = await manager.deleteAllProducts(cid);
    res.send({ status: "success", result, message: "All products deleted." });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
};

export default CartController;
