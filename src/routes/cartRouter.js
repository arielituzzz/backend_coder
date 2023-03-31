import express from "express";
import ProductManager from "./ProductManager.js"

const app = express();

const PORT = 8080

app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager();

app.get("/products", async (req, res) => {

	//Opcion para pedir limite de busqueda de los primeros objetos.
	const limitStart = parseInt(req.query.limitStart);

	//Opcion para pedir limite de busqueda de los ultimos objetos.
	const limitEnd = parseInt(req.query.limitEnd);

	try{

		// Traigo los productos del archivo Products.json
		const products = await productManager.getProducts();

		if(limitStart > 0 && limitStart <= products.length) {

			const firstProducts = products.splice(0, limitStart);

			res.send(firstProducts);

			return;

		};

		if(limitEnd > 0 && limitEnd <= products.length) {

			const lastProducts = products.splice(-limitEnd);

			res.send(lastProducts);

			return;
		};

		res.send(products);
	}
	catch(err) {

		res.send(err);

	};


});

app.get("/products/:pid", async (req, res) => {

	try{

		const product = await productManager.getProductById(parseInt(req.params.pid));

		res.send(product);
	}
	catch(err) {

		res.send(err);

	};

});

app.listen(PORT, () => {console.log(`Server listen on port ${PORT}`)});

