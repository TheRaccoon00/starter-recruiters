const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  label: String,
}, { timestamps: true });

const Job = mongoose.model('job', jobSchema);

module.exports = Job;
