const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specializationSchema = new Schema({
    name: { type: String, required: true },
    yearLevel: { type: Schema.Types.ObjectId, ref: 'YearLevel' },
});

const Specialization = mongoose.model('Specialization', specializationSchema);
module.exports = Specialization;
