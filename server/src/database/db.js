const mongoose = require('mongoose');

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

module.exports = mongoose.model('Book', bookSchema);