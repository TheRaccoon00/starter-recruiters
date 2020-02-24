const Candidate = require('../models/Candidate');

/**
 * GET /
 * Recruiter page.
 */
exports.getCandidates = (req, res) => {
  Candidate.find({}, function(err, candidates) {
    var candidateMap = {};
    candidates.forEach(function(candidate) {
      candidateMap[candidate._id] = candidate;
    });

    var length = Object.values(candidateMap).length;
    console.log(length)
    res.render('recruiter/mycandidates', {
      title: 'Espace recruteur',
      candidates: Object.values(candidateMap),
      length: length
    });
  });
};

/**
 * GET /
 * Recruiter page.
 */
exports.getAddCandidate = (req, res, next) => {
  res.render('recruiter/addcandidate', {
    title: 'Ajouter un candidat'
  });
};

exports.postCandidate = (req, res) => {
  let name;
  let first_name;
  let job_id;

  console.log(req.body);
  name = req.body.name;
  first_name = req.body.firstname;
  job_id = req.body.job;

  const candidate = new Candidate({
    name: name,
    firstname: first_name,
    jobid: job_id
  });

  Candidate.findOne({ name: name, firstname: first_name }, (err, existingCandidate) => {
    if (err) { return next(err); }
    if (existingCandidate) {
      req.flash('errors', { msg: 'Ce candidat a déjà été ajouté !' });
      return res.redirect('/recruiter/addcandidate');
    }
    candidate.save((err) => {
        res.render('recruiter/addcandidate');
      });
    });
}
