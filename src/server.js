import dotenv from "dotenv";
dotenv.config();
import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import userRouter from "./routes/userRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo";

const uri = process.env.MONGO_DB_URI;
const PORT = 8080;

void (async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      store: mongoStore.create({
        mongoUrl: uri,
        ttl: 10,
      }),
      secret: "CoderS3cR3tC0D3",
      resave: false,
      saveUninitialized: false,
    })
  );

  // app.use("/api/products", productsRouter);
  // app.use("/api/carts", cartsRouter);
  app.use("/api/sessions", sessionRouter);
  app.use("/api/users", userRouter);

  app.listen(PORT, () => {
    console.log(`Ready: Server listening on port ${PORT}`);
  });
})();
