const { Router } = require('express');
const LandOfTheLost = require('../model/land-of-the-lost');

module.exports = Router()
  .post('/', (req, res, next) => {

    LandOfTheLost
      .insert(req.body)
      .then(character => res.send(character))
      .catch(next);
  })

  .get('/', (req, res, next) => {

    LandOfTheLost
      .find()
      .then(characters => res.send(characters))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {

    LandOfTheLost
      .findById(req.params.id)
      .then(character => res.send(character))
      .catch(next);
  });
