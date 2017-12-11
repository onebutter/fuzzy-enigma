import pick from 'lodash/pick';
import allowed from './permissions';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );

  User.isValidPassword = function(password) {
    return password.length;
  };

  User.prototype.checkPassword = function(password) {
    return this.password === password;
  };

  User.prototype.applyRole = function(role) {
    return pick(this, allowed[role]);
  };

  return User;
};
