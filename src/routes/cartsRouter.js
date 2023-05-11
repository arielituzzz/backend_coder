import { Router } from 'express';
import CartController, { deleteOne, getOne, save, update } from "../controllers/CartController.js";

const cartsRouter = Router();

cartsRouter.get('/', CartController.list);
cartsRouter.get('/:cid', getOne);
cartsRouter.post('/', save);
cartsRouter.put('/:cid', update);
cartsRouter.delete('/:cid', deleteOne);

export default cartsRouter;
