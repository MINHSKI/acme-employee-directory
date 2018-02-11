const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nicknames: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function(val){
      if(typeof val === 'string'){
        var nicknames = val.split(',').filter( v=> v.length > 0);
        this.setDataValue('nicknames', nicknames);
      }
      else {
        this.setDataValue('nicknames', val);
      }
    }
  },
}, {
  getterMethods: {
    fullName: function(){
      return `${this.firstName} ${this.lastName}`;
    } 
  }
});

module.exports = Employee;
