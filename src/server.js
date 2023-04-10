import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import {Server} from 'socket.io'
import ProductManager from "./models/ProductManager.js"

void(async() =>
	{
		try
		{
			const PORT = 8080;

			const app = express();

			const productManager = new ProductManager();

			app.use(express.json());
			app.use(express.urlencoded({ extended: true }));

			const viewsPath = resolve('src/views');

			app.engine('handlebars', engine({
				layoutsDir: `${viewsPath}/layouts`,
				defaultLayout: `${viewsPath}/layouts/main.handlebars`,
			}));

			app.set('view engine', 'handlebars');
			app.set('views', viewsPath);

			
			//app.use("/realTimeProducts", productsRouter);

			const httpServer = app.listen(PORT, () => {console.log(`SERVER READY: Server listen on port ${PORT}`)});

			const socketServer = new Server(httpServer);
			
			socketServer.on("connection", socket => {

				console.log("Nuevo cliente conectado!");

			socket.on("message", (data) => console.log(data));


			});


		//ENLISTO TODOS LOS PRODUCTOS (EN TIEMPO REAL)
		app.get("/realTimeProducts", async (req, res) => {
			
			try
			{
			
				// Traigo los productos del archiv    o Products.json
			  const products = await productManager.getProducts();
			
			  res.render("realTimeProducts", {products:products})
			}
			catch(err) 
			{
			
				res.status(404).json({status: "Error", message: err.message});
			  
			};
			
		});



		}
		catch (e)
		{
			console.log(e);
		}
	})();

