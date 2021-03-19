const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const roleSchema = new Schema({
    id: monogoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
});

module.exports = Model('Role', roleSchema);