import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  subject: String,
  publicationDate: Number,
  imgURL: String
})

const bookModel = mongoose.model("books", bookSchema)

export default bookModel