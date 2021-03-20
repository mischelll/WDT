const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const roleSchema = new Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Model('Role', roleSchema);