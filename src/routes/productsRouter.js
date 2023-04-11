import {Router} from "express";
import ProductManager from "../models/ProductManager.js"

const productsRouter = Router();

const productManager = new ProductManager();

//ENLISTO TODOS LOS PRODUCTOS (ESTATICOS)
productsRouter.get("/", async (req, res) => {

	try{
		// Traigo los productos del archivo Products.json
		const products = await productManager.getProducts();

		res.render("home", {products:products})
	}
	catch(err) {
		res.status(404).json({status: "Error", message: err});
	};

});

//ENLISTO TODOS LOS PRODUCTOS (REAL TIME PRODUCTS)
productsRouter.get("/realTimeProducts", (req, res) => {
	res.render("realTimeProducts");
});

export default productsRouter;
