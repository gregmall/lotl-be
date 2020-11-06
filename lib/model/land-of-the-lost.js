const { query } = require('../utils/pool');
const pool = require('../utils/pool');

class LandOfTheLost {
  id;
  name;
  image;
  species;
  actor;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.image = row.image;
    this.species = row.species;
    this.actor = row.actor;

  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM landofthelost'
    );
    
    return rows.map(row => new LandOfTheLost(row));
  }

  static async insert(character) {
    const { rows } = await pool.query(
      `INSERT INTO landofthelost (name, image, species, actor)
       VALUES ($1,$2, $3, $4)
       RETURNING *`,
      [character.name, character.image, character.species, character.actor]
    );
    return new LandOfTheLost(rows[0]);
  }
  static async findById(id){
    const { rows } = await pool.query(
      'SELECT * FROM landofthelost WHERE id=$1',
      [id]
    );
    if(!rows) return null;
    else return new LandOfTheLost(rows[0]);
  }

}
module.exports = LandOfTheLost;
