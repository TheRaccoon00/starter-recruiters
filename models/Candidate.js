const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  firstname: String,
  jobid: String,
  recruiterid: String
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);

candidateSchema.pre('save', function save(next) {
  const candidate = this;
  next();
});

module.exports = Candidate;
