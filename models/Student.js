const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Student schema
const studentSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: false },
    specialization: { type: Schema.Types.ObjectId, ref: 'Specialization' },
    yearLevel: { type: Schema.Types.ObjectId, ref: 'YearLevel' },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
