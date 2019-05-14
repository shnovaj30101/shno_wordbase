const mongoose = require('./db.js'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const articleSchema = new Schema({
    id: Number,
    date: Number,
    english: Array,
    chinese: Array,
    audio_break_point: Array
},{ collection: 'article'});

articleSchema.plugin(mongoosePaginate);

const articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;
