import mongoose from 'mongoose'
const schema = mongoose.Schema;

const authorSchema  = new schema({
    name: String,
    age: Number,
});

const model = mongoose.model('author', authorSchema);

export default model;