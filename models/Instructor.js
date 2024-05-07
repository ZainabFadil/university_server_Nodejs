const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Instructor schema
const instructorSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: false },
    specialization: [{ type: Schema.Types.ObjectId, ref: 'Specialization' }],
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
