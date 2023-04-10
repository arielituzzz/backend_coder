import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import productsRouter from "./routes/productsRouter.js"

void(async() =>
	{
		    try
		    {
					        const PORT = 8080;

					        const app = express();
					        app.use(express.json());
					        app.use(express.urlencoded({ extended: true }));

					        const viewsPath = resolve('src/views');

					        app.engine('handlebars', engine({
										          layoutsDir: `${viewsPath}/layouts`,
										          defaultLayout: `${viewsPath}/layouts/main.handlebars`,
										        }));
					        app.set('view engine', 'handlebars');
					        app.set('views', viewsPath);

									app.use("/api/products", productsRouter);

									app.listen(PORT, () => {console.log(`SERVER READY: Server listen on port ${PORT}`)});

					    }
		    catch (e)
		    {
					        console.log(e);
					    }
	})();
