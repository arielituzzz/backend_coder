import {Router} from "express";
import ProductManager from "../models/ProductManager.js";
import {client, runDB} from "../bd/mongo_config.js";

const productsRouter = Router();

const productManager = new ProductManager();

//ENLISTO TODOS LOS PRODUCTOS CON OPCION DE PEDIR LOS PRIMEROS O LOS ULTIMOS
productsRouter.get("/", async (req, res) => {

	//Opcion para pedir limite de busqueda de los primeros objetos.
	const limitStart = parseInt(req.query.limitStart);

	//Opcion para pedir limite de busqueda de los ultimos objetos.
	const limitEnd = parseInt(req.query.limitEnd);

	try{
		
		const db = runDB("sample_mflix","movies");

		// Query for a movie that has the title 'The Room'
		//const query = { title: "The Room" };
		//const options = {
			//               // sort matched documents in descending order by rating
			//sort: { "imdb.rating": -1 },
			//                           // Include only the `title` and `imdb` fields in the returned document
			//projection: { _id: 0, title: 1, imdb: 1 },
		//};
		//const movie = await db.findOne(query, options);
		const movie = await db.findOne({title: "The Room"});
		//                                             // since this method returns the matched document, not a cursor, print it directly
		console.log(movie);




		// Traigo los productos del archivo Products.json
		const products = await productManager.getProducts();

		if(limitStart > 0 && limitStart <= products.length) {

			const firstProducts = products.splice(0, limitStart);

			res.status(302).json({status: "success", resolve: firstProducts});

			return;

		};

		if(limitEnd > 0 && limitEnd <= products.length) {

			const lastProducts = products.splice(-limitEnd);

			res.status(302).json({status: "success", resolve: lastProducts});

			return;
		};

		res.status(302).json({status: "success", resolve: products});
	}
	catch(err) {

		res.status(404).json({status: "Error", message: err});

	}finally {
		await client.close();
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
