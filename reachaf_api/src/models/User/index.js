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
      },
      numNamecard: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
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

  User.validatePassword = function(password) {
    if (password.length < 4 || password.length > 40) {
      return {
        isFailed: true,
        error: {
          code: 'PASSWORD_INVALID_LENGTH',
          message: 'password must be between 4 to 40 characters'
        }
      };
    }
    return {
      isFailed: false
    };
  };

  User.validateUsername = function(username) {
    if (username.legnth > 24 || username.length < 2) {
      return {
        isFailed: true,
        error: {
          code: 'USERNAME_INVALID_LENGTH',
          message: 'username has to be between 2 to 24 characters'
        }
      };
    }

    if (!username.match(/[A-z]{1}([A-z0-9_.\-@]+)/)) {
      return {
        isFailed: true,
        error: {
          code: 'USERNAME_BAD',
          message: 'invalid character is included'
        }
      };
    }

    return {
      isFailed: false
    };
  };

  User.prototype.isAdmin = function() {
    return this.role === 'admin';
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
