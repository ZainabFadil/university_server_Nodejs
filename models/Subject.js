const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: { type: String, required: true },
    yearLevel: { type: Schema.Types.ObjectId, ref: 'YearLevel' },
    specialization: { type: Schema.Types.ObjectId, ref: 'Specialization' },
    instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;