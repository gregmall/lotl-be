const LandOfTheLost = require('../model/land-of-the-lost');
const starterData  = require('./starterData');
const pool = require('../utils/pool');
const fs = require('fs');

pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

starterData.map(character => {
  return LandOfTheLost.insert(character);

});
