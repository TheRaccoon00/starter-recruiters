const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  label: String,
}, { timestamps: true });

const Job = mongoose.model('Candidate', jobSchema);

module.exports = Job;
