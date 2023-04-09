import {Router} from "express";
import CartsManager from "../models/CartsManager.js";
import ProductManager from "../models/ProductManager.js";

const cartsRouter = Router();

const cartsManager = new CartsManager();

const productManager = new ProductManager();

//LISTADO DE CARRITOS CON OPCION A VER LOS PRIMEROS O LOS ULTIMOS
cartsRouter.get("/", async (req, res) => {

	//Opcion para pedir limite de busqueda de los primeros carritos.
	const limitStart = parseInt(req.query.limitStart);

	//Opcion para pedir limite de busqueda de los ultimos carritos.
	const limitEnd = parseInt(req.query.limitEnd);

	try{

		// Traigo los carritos del archivo Carts.json
		const carts = await cartsManager.getCarts();

		if(limitStart > 0 && limitStart <= carts.length) {

			const firstCarts = carts.splice(0, limitStart);

			res.status(302).json({status: "success", resolve: firstCarts});

			return;

		};

		if(limitEnd > 0 && limitEnd <= carts.length) {

			const lastCarts = carts.splice(-limitEnd);

			res.status(302).json({status: "success", resolve: lastCarts});

			return;
		};

		res.status(302).json({status: "success", resolve: carts});
	}
	catch(err) {

		res.status(404).json({status: "Error", message: err});

	};


});

//BUSCAR UN CARRITO PARA LISTAR TODOS SUS PRODUCTOS
cartsRouter.get("/:cid", async (req, res) => {

	try{

		const cart = await cartsManager.getCartById(Number(req.params.cid));

		res.status(302).json({status: "success", resolve: cart});
	}
	catch(err) {

		res.status(404).json({status: "Error", message: err});

	};

});

// CREO UN NUEVO CARRITO
cartsRouter.post("/", async (req, res) => {

	try{

		res.status(201).json({status: "success", resolve: await cartsManager.addCart()});

	}
	catch(err) {

		res.status(400).json({status: "Error", message: err});
	}


});

//AGREGO UN PRODUCTO AL CARRITO Y EN CASO DE QUE YA EXISTA SE AGREGA SOLO LA CANTIDAD
cartsRouter.post("/:cid/product/:pid", async (req, res) => {

	try{

		const cartId = Number(req.params.cid);
		const productId = Number(req.params.pid);

		const foundProduct = await productManager.getProductById(productId);
		res.status(201).json({status: "success", resolve: await cartsManager.addProductToCart(cartId, foundProduct)});


	}
	catch(err) {

		res.status(404).json({status: "Error", message: err});

	}


});

//BORRO UN PRODUCTO DEL CARRITO Y REGRESO LA CANTIDAD AL STOCK DEL PRODUCTO
cartsRouter.delete("/:cid/products/:pid", async (req, res) => {

	try{

		const cartId = Number(req.params.cid);
		const productId = Number(req.params.pid);

		res.status(200).json({status: "success", resolve: await cartsManager.deleteProductToCart(cartId, productId)});

	}catch(err) {

		res.status(404).json({status: "Error", message: err});

	};

});


export default cartsRouter;
