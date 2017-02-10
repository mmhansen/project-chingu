var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cohort = new Schema({
  name: String,
  image: String,
  description: String,
  started: Boolean
});

module.exports = mongoose.model('Cohort', Cohort);