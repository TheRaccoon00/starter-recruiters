const mongoose = require('mongoose');

const userCandidateRelSchema = new mongoose.Schema({
  userId: String,
  candidateId: String
}, { timestamps: true });

const UserCandidateRel = mongoose.model('UserCandidateRel', userCandidateRelSchema);

userCandidateRelSchema.pre('save', function save(next) {
  const relation = this;
  next();
});

module.exports = UserCandidateRel;
