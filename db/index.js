const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/checkout', { useNewUrlParser: true, useUnifiedTopology: true });

let flightGroupSchema = mongoose.Schema({
    name: String,
    members: [Object]
});

let Group = mongoose.model('group', flightGroupSchema);

module.exports = Group