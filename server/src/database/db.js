const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        throw error;
    }
}

connectDB();

const Schema = mongoose.Schema;
const bookSchema = new Schema ({
    publication: String,
    author: String,
    date: Date,
    year: Number,
    month: Number,
    day: Number,
    reason: String,
    state_arc: String
})

bookSchema.index({ publication: "text", author: "text", reason: "text", state_arc: "text"});

module.exports = mongoose.model('Book', bookSchema);