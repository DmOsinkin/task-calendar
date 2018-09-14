var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date }
});

module.exports = mongoose.model('Task', BookSchema);