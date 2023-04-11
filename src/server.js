import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import {Server} from 'socket.io';
import productsRouter from "./routes/productsRouter.js"
import ProductManager from "./models/ProductManager.js";

void(async() =>
	{
		try
		{
			const PORT = 8080;

			const app = express();

			const productManager = new ProductManager();

			app.use(express.json());
			app.use(express.urlencoded({ extended: true }));
			app.use("/", productsRouter);

			const viewsPath = resolve('src/views');

			app.engine('handlebars', engine({
				layoutsDir: `${viewsPath}/layouts`,
				defaultLayout: `${viewsPath}/layouts/main.handlebars`,
			}));

			app.set('view engine', 'handlebars');
			app.set('views', viewsPath);

			const httpServer = app.listen(PORT, () => {console.log(`SERVER READY: Server listen on port ${PORT}`)});

			const socketServer = new Server(httpServer);

			socketServer.on("connection", async socket => {

				console.log("Client on-line");

				socket.emit("listProducts", await productManager.getProducts());	

				socket.on("createProduct", async (data) => {

					try
					{
						if(!data.thumbnail) {
							data.thumbnail = null;
							await productManager.addProduct(data);
						}
						socketServer.emit("liveProducts", await productManager.getProducts());
					}
					catch(e)
					{
						console.log(e);	
					}

				});

				socket.on("deleteProduct", async (data) => {

					try
					{
						await productManager.deleteProduct(data);

						socketServer.emit("liveProducts", await productManager.getProducts());
					}
					catch(err)
					{
						console.log(err);
					}

				});

				socket.on("disconnect", () => {

					console.log("Client off-line");

				});

			});

		}
		catch (e)
		{
			console.log(e);
		}
	})();

