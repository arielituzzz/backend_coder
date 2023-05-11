import { Router } from 'express';
import ProductController, { getOne, save, update, deleteOne, addToCart, productDisabled, productEnabled } from "../controllers/ProductController.js";

const productsRouter = Router();

productsRouter.get('/', ProductController.list);
productsRouter.get('/:pid', getOne);
productsRouter.post('/', save);
productsRouter.post('/:pid/cart/:cid', addToCart);
productsRouter.put('/:pid', update);
productsRouter.put('/:pid/disable', productDisabled);
productsRouter.put('/:pid/enable', productEnabled);
productsRouter.delete('/:pid', deleteOne);

export default productsRouter;
