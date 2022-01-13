const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    id:Number,
    cardId: String,
    authorized: String, // TODO: Convert it to boolean value
    date: String
})

const Entry = new mongoose.model('entry', entrySchema);

module.exports = Entry;