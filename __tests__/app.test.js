const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const LandOfTheLost = require('../lib/model/land-of-the-lost');

describe('lotl-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a character', async() => {
    const res = await request(app)
      .post('/api/v1/characters')
      .send({
        name: 'Holly Marshall',
        image: 'www.landofthelost.com',
        species: 'human',
        actor: 'Kathy Coleman'
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Holly Marshall',
      image: 'www.landofthelost.com',
      species: 'human',
      actor: 'Kathy Coleman'

    });
  });
});
