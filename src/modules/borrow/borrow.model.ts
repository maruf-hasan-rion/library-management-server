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
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.pre("save", async function (next) {
  // const borrow = this;
  if (!this.book) return next();

  const book = await Book.findById(this.book);

  if (!book) {
    const error: any = new Error("Book not found");
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

    return next(error);
  }

  if (book.copies < this.quantity) {
    const error: any = new Error(
      `Only ${book.copies} copies available to borrow`
    );
    error.statusCode = 400;
    error.customError = {
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidatorError",
        path: "copies",
        message: `Only ${book.copies} copies available to borrow`,
      },
    };

    return next(error);
  }

  book.copies -= this.quantity;
  book.checkAvailability();

  await book.save();
  next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
