import {Router} from "express";
import ProductManager from "../models/ProductManager.js"

const productsRouter = Router();

const productManager = new ProductManager();

//ENLISTO TODOS LOS PRODUCTOS (EN EL HOME)
productsRouter.get("/", async (req, res) => {

	try{

		// Traigo los productos del archivo Products.json
		const products = await productManager.getProducts();


		res.render("realTimeProducts", {products:products})
	}
	catch(err) {

		res.status(404).json({status: "Error", message: err});

	};


});

//BUSCO UN PRODUCTO POR SU RESPECTIVO ID
productsRouter.get("/:pid", async (req, res) => {

	try{

		const product = await productManager.getProductById(parseInt(req.params.pid));

		res.status(302).json({status: "success", resolve: product});
	}
	catch(err) {

		res.status(404).json({status: "Error", message: err});

	};

});

//CREO UN NUEVO PRODUCTO
productsRouter.post("/", async (req, res) => {

	try{

		const newProduct = req.body;

		if(newProduct.thumbnail === undefined) {
			newProduct.thumbnail = null;
		}

		res.status(201).json({status: "success", resolve: await productManager.addProduct(newProduct)});

	}
	catch(err) {

		res.status(400).json({status: "Error", message: err});
	}

});

//ACTUALIZO PROPIEDADES DEL PRODUCTO BUSCANDOLO POR SU ID
productsRouter.put("/:pid", async (req, res) => {

	try{

		const id = Number(req.params.pid);
		const productToUpdate = req.body;

		res.status(201).json({status: "success", resolve: await productManager.updateProduct(id, productToUpdate)});


	}catch(err) {

		res.status(404).json({status: "Error", message: err});

	};

});

// ELIMINO UN PRODUCTO
productsRouter.delete("/:pid", async (req, res) => {

	try{

		const id = Number(req.params.pid);

		res.status(200).json({status: "success", resolve: await productManager.deleteProduct(id)});

	}catch(err) {

		res.status(404).json({status: "Error", message: err});

	};

});

export default productsRouter;
