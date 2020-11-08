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
  
  it('gets all characters', async() => {
    const characters = await Promise.all([
      {   name: 'Holly Marshall',
        image: 'www.landofthelost.com',
        species: 'human',
        actor: 'Kathy Coleman'
      },
      {   name: 'Steve Actor',
        image: 'www.landofthelostyeah.com',
        species: 'human',
        actor: 'Bill Person'
      },
      {   name: 'Garh Nah',
        image: 'www.sleestack.com',
        species: 'sleestack',
        actor: 'Marv Marvelous'
      }
      

    ].map(character => LandOfTheLost.insert(character)));

    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        characters.forEach(character => {
          expect(res.body).toContainEqual(character);
        });
      });
  

  });
  it('gets a character by ID', async() => {
    const character = await LandOfTheLost.insert({

      name: 'Holly Marshall',
      image: 'www.landofthelost.com',
      species: 'human',
      actor: 'Kathy Coleman'
    });
    const response = await request(app)
      .get(`/api/v1/characters/${character.id}`);
    
    expect(response.body).toEqual(character);
    
  });
  it('updates a character by id', async() => {
    const character = await LandOfTheLost.insert({
      name: 'Holly Marshall',
      image: 'www.landofthelost.com',
      species: 'human',
      actor: 'Kathy Coleman'

    });

    return request(app)
      .put(`/api/v1/characters/${character.id}`)
      .send({
        name: 'Holly Marshall',
        image: 'www.land.com',
        species: 'human',
        actor: 'Kathy Wilma Coleman'

      })
      .then(res => {
        expect(res.body).toEqual({

          id: expect.any(String),
          name: 'Holly Marshall',
          image: 'www.land.com',
          species: 'human',
          actor: 'Kathy Wilma Coleman'

        });
      });
  });

  it('deletes a character by id', async() => {
    const character = await LandOfTheLost.insert({
      name: 'Holly Marshall',
      image: 'www.landofthelost.com',
      species: 'human',
      actor: 'Kathy Coleman'

    });
    const response = await request(app)
      .delete(`/api/v1/characters/${character.id}`);

    expect(response.body).toEqual(character);

  });

 
});
