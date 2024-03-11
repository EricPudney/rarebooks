import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  subject: String,
  publicationDate: Number,
  binding: String,
  condition: String,
  notes: String,
  imgURL: String
})

const bookModel = mongoose.model("books", bookSchema)

export default bookModel