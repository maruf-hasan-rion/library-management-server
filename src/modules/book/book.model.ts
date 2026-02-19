import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";
import { Borrow } from "../borrow/borrow.model";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true },
);

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

bookSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    if (doc) await Borrow.deleteMany({ book: doc._id });
    next();
  } catch (err) {
    next(err as any);
  }
});

export const Book = model<IBook>("Book", bookSchema);
