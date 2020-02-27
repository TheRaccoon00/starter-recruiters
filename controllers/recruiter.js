const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const UserCandidateRel = require('../models/Job');

/**
* GET /recruiter
* Redirect to mycandidates
*/
exports.redirectRecruiter = (req, res) =>
{
  res.redirect('recruiter/mycandidates');
}

/**
* GET /recruiter/mycandidates
* Recruiter page.
*/
exports.getCandidates = (req, res) => {
  if (!req.user) {
    return res.redirect('../login');
  }
  Candidate.find({recruiterid: req.user._id}, function(err, candidates) {
    var candidateMap = {};
    candidates.forEach(function(candidate) {
      candidateMap[candidate._id] = candidate;
    });
    Job.find({}, function(err, jobs) {
      var jobMap = {};
      jobs.forEach(function(job) {
        jobMap[job._id] = job;
      });

      candidatesArray = Object.values(candidateMap);
      jobsArray = Object.values(jobMap);

      // ON RECUPERE LES LABEL DES JOBS
      for (let i = 0; i < candidatesArray.length ; i ++){
        for (let j = 0; j < jobsArray.length ; j ++){
          if (candidatesArray[i].jobid == jobsArray[j]._id){
            candidatesArray[i].job = jobsArray[j].label;
            break;
          }
        }
      }

      res.render('recruiter/mycandidates', {
        title: 'Espace recruteur',
        candidates: candidatesArray,
        jobs: jobsArray,
        length: candidatesArray.length
      });
    });
  });
};

/**
* GET /recruiter/addcandidate
* Add candidate page.
*/
exports.getAddCandidate = (req, res, next) => {
  if (!req.user) {
    return res.redirect('../login');
  }

  Job.find({}, function(err, jobs) {
    var jobMap = {};
    jobs.forEach(function(job) {
      jobMap[job._id] = job;
    });
    var length = Object.values(jobMap).length;

    ////// COMPLETER LA BASE DE DONNEES EN TYPE DE JOB POUR LE PREMIER LANCEMENT DE L'APPLICATION
    if (length == 0){
      var job = new Job({
        label: "Technologie"
      });
      job.save((err) => {});
      job = new Job({
        label: "Business"
      });
      job.save((err) => {});
      job = new Job({
        label: "Ventes"
      });
      job.save((err) => {});
      job = new Job({
        label: "Communication"
      });
      job.save((err) => {});
      job = new Job({
        label: "Opérations"
      });
      job.save((err) => {});
      job = new Job({
        label: "Produit"
      });
      job.save((err) => {});
      job = new Job({
        label: "Marketing"
      });
      job.save((err) => {});
      job = new Job({
        label: "Agence"
      });
      job.save((err) => {});
      job = new Job({
        label: "Growth"
      });
      job.save((err) => {});
    }
    //////

    res.render('recruiter/addcandidate', {
      title: 'Espace recruteur',
      jobs: Object.values(jobMap),
      length: length
    });
  });
};

/**
* POST /recruiter/addcandidate
* Add Candidate.
*/
exports.postCandidate = (req, res) => {
  if (!req.user) {
    return res.redirect('../login');
  }
  let name;
  let first_name;
  let job_id;

  name = req.body.name;
  first_name = req.body.firstname;
  job_id = req.body.job;

  const candidate = new Candidate({
    name: name,
    firstname: first_name,
    jobid: job_id,
    recruiterid: req.user._id
  });

  Candidate.findOne({ name: name, firstname: first_name }, (err, existingCandidate) => {
    if (err) { return next(err); }
    if (existingCandidate) {
      req.flash('errors', { msg: 'Ce candidat a déjà été ajouté !' });
      return res.redirect('/recruiter/addcandidate');
    }
    candidate.save((err) => {
      if (err) throw err;
      res.render('recruiter/addcandidate');
    });
  });
}

/**
* DELETE /recruiter/deleteCandidate/:id
* Delete candidate id.
*/
exports.deleteCandidate = (req, res) => {
  if (!req.user) {
    return res.redirect('../login');
  }

  const { id } = req.params;
  Candidate.deleteOne({_id:id}  ,function(err,obj){
    if (err) throw err;
    res.redirect('../../recruiter/mycandidates');
  })
};
