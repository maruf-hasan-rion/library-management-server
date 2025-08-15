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
bookRoute.get("/:bookId", getBookById);
bookRoute.put("/:bookId", updateBook);
bookRoute.delete("/:bookId", deleteBook);

export default bookRoute;
