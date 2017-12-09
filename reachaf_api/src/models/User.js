const User = (sequelize, DataTypes) =>
  sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

export default User;
