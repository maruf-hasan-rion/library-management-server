import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./book.controller";

const bookRoute = Router();

bookRoute.post("/", createBook);
bookRoute.get("/", getAllBooks);
bookRoute.get("/:id", getBookById);
bookRoute.put("/:id", updateBook);
bookRoute.delete("/:id", deleteBook);

export default bookRoute;
