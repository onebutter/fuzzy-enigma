import bcrypt from 'bcryptjs';
import pick from 'lodash/pick';
import allowed from './permissions';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user'
      }
    },
    {
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate: async user => {
          try {
            user.password = await bcrypt.hash(user.password, 10);
          } catch (err) {
            throw new Error(err);
          }
        }
      }
    }
  );

  User.associate = function(models) {
    models.User.hasMany(models.Namecard);
  };

  User.isValidPassword = function(password) {
    return password.length;
  };

  User.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.applyRole = function(role) {
    let forRole = role || this.role || 'user';
    return pick(this, allowed[forRole]);
  };

  return User;
};
