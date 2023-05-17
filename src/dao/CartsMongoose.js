import cartSchema from "./models/CartSchema.js";

class CartsMongoose {
  async find() {
    const cartsDocuments = await cartSchema.find();

    return cartsDocuments.map((document) => ({
      _id: document._id,
      products: document.products,
      status: document.status,
    }));
  }

  async getOne(id) {
    const cartDocument = await cartSchema.findOne({ _id: id });

    if (!cartDocument) {
      throw new Error("Cart don't exist.");
    }
    return cartDocument;
  }

  async create() {
    const cartDocument = await cartSchema.create({});

    return cartDocument;
  }

  async updateQuantity(cid, pid, quantity) {
    const cart = await cartSchema.findOne({ _id: cid });

    const product = cart.products.find((prod) => prod._id == pid);

    if (!cart || !product) {
      throw new Error("Cart or product don't exist.");
    }

    product.quantity = quantity;

    await cartSchema.updateOne(
      { _id: cid },
      { $set: { products: cart.products } },
      { new: true }
    );

    return product;
  }

  async updateOne(id, data) {
    const newProduct = { _id: data._id, quantity: 1 };
    const cart = await cartSchema.findOne({ _id: id });
    if (!cart) {
      throw new Error("Cart don't exist.");
    }

    return await cartSchema.findOneAndUpdate(
      { _id: id },
      { products: data },
      { new: true }
    );
  }

  async deleteOneProduct(cid, pid) {
    const cart = await cartSchema.findOne({ _id: cid });
    const indexProduct = cart.products.findIndex((prod) => prod._id == pid);

    if (!cart || indexProduct < 0) {
      throw new Error("Cart or product don't exist.");
    }

    const productDeleted = { ...cart.products[indexProduct] };

    cart.products.splice(indexProduct, 1);

    const newCart = await cartSchema.updateOne(
      { _id: cid },
      { $set: { products: cart.products } }
    );

    return productDeleted;
  }

  async deleteAllProducts(cid) {
    const result = await cartSchema.updateOne(
      { _id: cid },
      { $set: { products: [] } }
    );
    if (!result) {
      throw new Error("Cart don't exist.");
    }
    return result;
  }
}

export default CartsMongoose;
