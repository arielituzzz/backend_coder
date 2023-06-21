import ProductsMongoose from "../dao/ProductsMongoose.js";
import CartsMongoose from "../dao/CartsMongoose.js";
import ProductsAggregate from "../dao/aggregates/productsAggregate.js";

class ProductManager {
  constructor() {
    this.products = new ProductsMongoose();
    this.carts = new CartsMongoose();
    this.aggregates = new ProductsAggregate();
  }

  async paginate(data) {
    return this.products.paginate(data);
  }

  async find() {
    return this.products.find();
  }

  async findWithAggregates(status, limit, category, sort) {
    return this.aggregates.filters(status, limit, category, sort);
  }

  async getOne(id) {
    return this.products.getOne(id);
  }

  async create(data) {
    return await this.products.create(data);
  }

  async updateOne(id, data) {
    return this.products.updateOne(id, data);
  }

  async deleteOne(id) {
    return this.products.deleteOne(id);
  }

  async addProductToCart(pid, cid) {
    try {
      const cart = await this.carts.getOne(cid);
      const product = await this.products.getOne(pid);
      const newProduct = {
        _id: product._id,
        quantity: 1,
      };

      const productOnCart = cart.products.find(
        (p) => p._id.toString() === product._id.toString()
      );

      if (productOnCart) {
        productOnCart.quantity++;
      } else {
        cart.products.push(newProduct);
      }

      return await this.carts.updateOne(cid, cart.products);
    } catch (error) {
      return error;
    }
  }

  async productDisabled(pid) {
    try {
      const product = await this.products.getOne(pid);
      product.status = false;

      return await this.products.updateOne(pid, product);
    } catch (error) {
      return error;
    }
  }

  async productEnabled(pid) {
    try {
      const product = await this.products.getOne(pid);
      product.status = true;

      return await this.products.updateOne(pid, product);
    } catch (error) {
      return error;
    }
  }
}

export default ProductManager;
