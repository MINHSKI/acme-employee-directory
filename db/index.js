const conn = require('./conn');
const Employee = require('./Employee');

const sync = ()=> {
  return conn.sync({ force: true });
}

const data = [
  { firstName: 'Moe', lastName: 'Green', nicknames: ['Big Moe', 'Sleepy'] },
  { firstName: 'Larry', lastName: 'Tate', nicknames: ['Larry the Boss', 'Easy Money Larry', 'Frosty'] },
  { firstName: 'Curly', lastName: 'Jones', nicknames: ['Jonzee'] },
];
const seed = ()=> {
  return Promise.all(data.map( employee => Employee.create(employee)));
}

module.exports = {
  sync,
  seed,
  models: {
    Employee
  }
};
