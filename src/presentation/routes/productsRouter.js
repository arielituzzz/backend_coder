import { Router } from 'express';
import ProductController, { listPagination, getOne, save, update, deleteOne, addToCart, productDisabled, productEnabled, getWithAggregates } from "../controllers/ProductController.js";

const productsRouter = Router();

productsRouter.get('/', ProductController.list);
productsRouter.get('/pagination', listPagination);
productsRouter.get('/aggregates', getWithAggregates);
productsRouter.get('/:pid', getOne);
productsRouter.post('/', save);
productsRouter.post('/:pid/cart/:cid', addToCart);
productsRouter.put('/:pid', update);
productsRouter.put('/:pid/disable', productDisabled);
productsRouter.put('/:pid/enable', productEnabled);
productsRouter.delete('/:pid', deleteOne);

export default productsRouter;
