import { Router } from 'express';
import CartController, { deleteOne, getOne, save, update } from "../controllers/CartController.js";

const cartsRouter = Router();

cartsRouter.get('/', CartController.list);
cartsRouter.get('/:id', getOne);
cartsRouter.post('/', save);
cartsRouter.put('/:id', update);
cartsRouter.delete('/:id', deleteOne);

export default cartsRouter;
