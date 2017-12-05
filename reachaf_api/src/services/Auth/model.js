import { DataTypes } from 'sequelize';

const defineAuth = sequelize => {
  sequelize.define('Auth', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  });
};

export default defineAuth;
