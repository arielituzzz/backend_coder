import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import mongoose from "mongoose";

const PORT = 8080

void (async() =>
	{
		await mongoose.connect("mongodb+srv://arielituzzz:atlasDBcaracoles@clusterprueba.t9rwqyh.mongodb.net/ecommerce", {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		const app = express();

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		app.use('/api/products', productsRouter);
		app.use('/api/carts', cartsRouter);
app.listen(PORT, () => {
			console.log(`Ready: Server listening on port ${PORT}`);
		});
	})();

