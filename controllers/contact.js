const validator = require('validator');
const nodemailer = require('nodemailer');

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  const unknownUser = !(req.user);

  res.render('contact', {
    title: 'Contact',
    unknownUser,
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  const validationErrors = [];
  let fromName;
  let fromEmail;
  if (validator.isEmpty(req.body.name)) validationErrors.push({ msg: 'Veuillez entrer votre nom.' });
  if (validator.isEmpty(req.body.email)) validationErrors.push({ msg: 'Veuillez entrer votre adresse mail.' });
  if (validator.isEmpty(req.body.message)) validationErrors.push({ msg: 'Veuillez entrer votre message.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/contact');
  }

  req.flash('errors', { msg: 'Ce formulaire est fake, désolé :/' });
  return res.redirect('/contact');

};
