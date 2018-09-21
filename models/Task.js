var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);