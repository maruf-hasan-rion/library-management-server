import { Router } from "express";
import { borrowBook, getBorrowedBooksSummary } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/", borrowBook);
borrowRoute.get("/", getBorrowedBooksSummary);

export default borrowRoute;
