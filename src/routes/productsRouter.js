import { Router } from 'express';
import ProductController, { getOne, save, update, deleteOne } from "../controllers/ProductController.js";

const productsRouter = Router();

productsRouter.get('/', ProductController.list);
productsRouter.get('/:code', getOne);
productsRouter.post('/', save);
// productsRouter.post('/:sid/courses/:cid', addCourse);
productsRouter.put('/:code', update);
productsRouter.delete('/:id', deleteOne);

export default productsRouter;
