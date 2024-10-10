const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('coachings/index.hbs');
});

router.post('/', function (req, res, next) {
  const { name, body, tel } = req.body; 

  if (!name || name.trim().split(' ').length < 2) {
    return res.render('coachings/index.hbs', {
      error: "Veuillez entrer au moins deux chaînes de caractères (Nom et Prénom).",
      name,
      body,
      tel
    });
  }

  const subject = encodeURIComponent(`Réservation Coaching - ${name}`);
  const bodyMessage = encodeURIComponent(`COACHING \n _____________________________ \n \n${tel}\n\n${body}\n \n`);
  const mailtoLink = `mailto:audreykinecoach@gmail.com?subject=${subject}&body=${bodyMessage}`;

  res.redirect(mailtoLink);
});

module.exports = router;