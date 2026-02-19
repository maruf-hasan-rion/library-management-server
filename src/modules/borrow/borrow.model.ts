import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

borrowSchema.pre("save", async function (next) {
  try {
    if (!this.book) return next();

    const updatedBook = await Book.findOneAndUpdate(
      { _id: this.book, copies: { $gte: this.quantity } },
      { $inc: { copies: -this.quantity } },
      { new: true },
    );

    if (!updatedBook) {
      const exists = await Book.exists({ _id: this.book });

      const error: any = new Error(
        exists ? "Not enough copies available" : "Book not found",
      );

      if (!exists) {
        error.statusCode = 404;
        error.customError = {
          success: false,
          message: "Book not found",
          error: {
            name: "NotFoundError",
            path: "book",
            message: `Book with ID ${this.book} does not exist`,
          },
        };
      } else {
        error.statusCode = 400;
        error.customError = {
          message: "Validation failed",
          success: false,
          error: {
            name: "ValidatorError",
            path: "copies",
            message: "Not enough copies available to borrow",
          },
        };
      }

      return next(error);
    }

    if (updatedBook.copies === 0 && updatedBook.available !== false) {
      updatedBook.available = false;
      await updatedBook.save();
    } else if (updatedBook.copies > 0 && updatedBook.available !== true) {
      updatedBook.available = true;
      await updatedBook.save();
    }

    next();
  } catch (err) {
    next(err as any);
  }
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
