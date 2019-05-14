const mongoose = require('./db.js'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const problemSchema = new Schema({
    url: String,
    text: String,
    word_pos: Array,
    chinese_trans: Array,
    answer_times: Array,
    index_word: Array,
    look_times: Array,
    add_date: Date,
    modify_date: Date,
}, { collection: 'problem'});

problemSchema.index({text: "text", chinese_trans: "text", index_word: "text"});
problemSchema.plugin(mongoosePaginate);
const problemModel = mongoose.model('Problem', problemSchema);

module.exports = problemModel;
