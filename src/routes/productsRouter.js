import {Router} from "express";
import ProductManager from "../models/ProductManager.js"

const productsRouter = Router();

const productManager = new ProductManager();

//ENLISTO TODOS LOS PRODUCTOS CON OPCION DE PEDIR LOS PRIMEROS O LOS ULTIMOS
productsRouter.get("/", async (req, res) => {

	//Opcion para pedir limite de busqueda de los primeros objetos.
	const limitStart = parseInt(req.query.limitStart);

	//Opcion para pedir limite de busqueda de los ultimos objetos.
	const limitEnd = parseInt(req.query.limitEnd);

	try{

		// Traigo los productos del archivo Products.json
		const products = await productManager.getProducts();

		if(limitStart > 0 && limitStart <= products.length) {

			const firstProducts = products.splice(0, limitStart);

			res.status(302).send(firstProducts);

			return;

		};

		if(limitEnd > 0 && limitEnd <= products.length) {

			const lastProducts = products.splice(-limitEnd);

			res.status(302).send(lastProducts);

			return;
		};

		res.status(302).send(products);
	}
	catch(err) {

		res.status(404).send(err);

	};


});

//BUSCO UN PRODUCTO POR SU RESPECTIVO ID
productsRouter.get("/:pid", async (req, res) => {

	try{

		const product = await productManager.getProductById(parseInt(req.params.pid));

		res.status(302).send(product);
	}
	catch(err) {

		res.status(404).send(err);

	};

});

//CREO UN NUEVO PRODUCTO
productsRouter.post("/", async (req, res) => {

	try{

		const newProduct = req.body;

		res.status(201).send(await productManager.addProduct(newProduct));

	}
	catch(err) {

		res.status(400).send(err);
	}

});

//ACTUALIZO PROPIEDADES DEL PRODUCTO BUSCANDOLO POR SU ID
productsRouter.put("/:pid", async (req, res) => {

	try{
		
		const id = Number(req.params.pid);
		const productToUpdate = req.body;

		res.status(201).send(await productManager.updateProduct(id, productToUpdate));
		

	}catch(err) {

		res.status(404).send(err);

	};

});

// ELIMINO UN PRODUCTO
productsRouter.delete("/:pid", async (req, res) => {

	try{

		const id = Number(req.params.pid);

		res.status(200).send(await productManager.deleteProduct(id));

	}catch(err) {

		res.status(404).send(err);

	};

});

export default productsRouter;
