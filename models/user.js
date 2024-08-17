'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      timestamps: true
    },
  )
  User.associate = (models) => {
    User.hasOne(models.Profile, { foreignKey: 'user_id', as: 'profile' })
  };
  User.sync({ alter: false })
  return User
}