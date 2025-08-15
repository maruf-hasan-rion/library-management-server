import express from "express";
import bookRoute from "../modules/book/book.route";
import borrowRoute from "../modules/borrow/borrow.route";

const routes = express.Router();

routes.use("/books", bookRoute);
routes.use("/borrow", borrowRoute);

export default routes;
