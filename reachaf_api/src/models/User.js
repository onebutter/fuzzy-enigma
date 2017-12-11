const User = (sequelize, DataTypes) =>
  sequelize.define(
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

export default User;
