import CartsMongoose from "../dao/CartsMongoose.js";

class CartManager {
  constructor() {
    this.carts = new CartsMongoose();
  }

  async find() {
    return await this.carts.find();
  }

  async getOne(id) {
    return await this.carts.getOne(id);
  }

  async create() {
    return await this.carts.create();
  }

  async updateQuantity(cid, pid, quantity) {
    return await this.carts.updateQuantity(cid, pid, quantity);
  }

  async updateOne(id, data) {
    return this.carts.updateOne(id, data);
  }

  async deleteOneProduct(cid, pid) {
    return await this.carts.deleteOneProduct(cid, pid);
  }

  async deleteAllProducts(cid) {
    return await this.carts.deleteAllProducts(cid);
  }
}

export default CartManager;
