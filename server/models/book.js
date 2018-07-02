import mongoose from "mongoose";
const schema = mongoose.Schema;

const bookSchema = new schema({
  name: String,
  genre: String,
  authorId: String,
  isDeleted: { type: Boolean, default: false }
});

const model = mongoose.model("book", bookSchema);

export default model;
