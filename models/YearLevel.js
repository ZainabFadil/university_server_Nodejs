const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// YearLevel schema
const yearLevelSchema = new Schema({
    name: { type: String, required: true ,
    enum: ['year1', 'year2', 'year3', 'year4']
    }
});
const YearLevel = mongoose.model('YearLevel', yearLevelSchema);
module.exports = YearLevel;
