import {Router} from "express";
import CartsManager from "../models/CartsManager.js"

const cartsRouter = Router();

const cartsManager = new CartsManager();

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

			res.status(302).send(firstCarts);

			return;

		};

		if(limitEnd > 0 && limitEnd <= carts.length) {

			const lastCarts = carts.splice(-limitEnd);

			res.status(302).send(lastCarts);

			return;
		};

		res.status(302).send(carts);
	}
	catch(err) {

		res.status(404).send(err);

	};


});

//BUSCAR UN CARRITO PARA LISTAR TODOS SUS PRODUCTOS
cartsRouter.get("/:cid", async (req, res) => {

	try{

		const cart = await cartsManager.getCartById(Number(req.params.cid));

		res.status(302).send(cart);
	}
	catch(err) {

		res.status(404).send(err);

	};

});

// CREO UN NUEVO CARRITO
cartsRouter.post("/", async (req, res) => {

	try{

		res.status(201).send(await cartsManager.addCart());

	}
	catch(err) {

		res.status(400).send(err);
	}


});

//AGREGO UN PRODUCTO AL CARRITO Y EN CASO DE QUE YA EXISTA SE AGREGA SOLO LA CANTIDAD
cartsRouter.post("/:cid/product/:pid", async (req, res) => {

	try{

		const cartId = Number(req.params.cid);
		const productId = Number(req.params.pid);
		
		res.status(201).send(await cartsManager.addProductToCart(cartId, productId));

	}
	catch(err) {

		res.status(404).send(err);

	}


});

//BORRO UN PRODUCTO DEL CARRITO Y REGRESO LA CANTIDAD AL STOCK DEL PRODUCTO
cartsRouter.delete("/:cid/products/:pid", async (req, res) => {

	try{

		const cartId = Number(req.params.cid);
		const productId = Number(req.params.pid);
		res.status(200).send(await cartsManager.deleteProductToCart(cartId, productId));

	}catch(err) {

		res.status(404).send(err);

	};

});




export default cartsRouter;
