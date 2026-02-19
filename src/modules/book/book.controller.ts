import { NextFunction, Request, Response } from "express";
import { Book } from "./book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    // filter (genre)
    const filterObj: Record<string, any> = {};
    if (filter) {
      filterObj.genre = filter;
    }

    // sortBy whitelist
    const allowedSortBy = [
      "createdAt",
      "updatedAt",
      "title",
      "author",
      "copies",
    ];
    const sortByValue = allowedSortBy.includes(sortBy as string)
      ? (sortBy as string)
      : "createdAt";

    // sort direction
    const sortOrder: 1 | -1 = sort === "asc" ? 1 : -1;
    const sortObj: Record<string, 1 | -1> = { [sortByValue]: sortOrder };

    // limit safe parse
    const limitNumber = Math.max(1, parseInt(limit as string, 10) || 10);

    const books = await Book.find(filterObj).sort(sortObj).limit(limitNumber);

    res.json({
      success: true,
      message: books.length ? "Books retrieved successfully" : "No books found",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: {
          name: "NotFoundError",
          path: "bookId",
          message: `Book does not exist`,
        },
      });
      return;
    }

    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.bookId;
    const updateData = req.body;

    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: {
          name: "NotFoundError",
          path: "bookId",
          message: `Book does not exist`,
        },
      });
      return;
    }

    Object.assign(book, updateData);
    await book.save();

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.bookId;
    const deletedBook = await Book.findOneAndDelete({ _id: id });

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: {
          name: "NotFoundError",
          path: "bookId",
          message: `Book does not exist`,
        },
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
