import { Router } from 'express';
import CartController, { getOne, save, update,updateQuantity, deleteOneProduct, deleteAllProducts } from "../controllers/CartController.js";

const cartsRouter = Router();

cartsRouter.get('/', CartController.list);
cartsRouter.get('/:cid', getOne);
cartsRouter.post('/', save);
cartsRouter.put('/:cid/product/:pid', updateQuantity);
cartsRouter.delete('/:cid/product/:pid', deleteOneProduct);
cartsRouter.delete('/:cid/allProducts', deleteAllProducts);

export default cartsRouter;
