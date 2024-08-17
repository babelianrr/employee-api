'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile',
    {
      user_id: DataTypes.INTEGER,
      position: DataTypes.STRING,
      name: DataTypes.STRING,
      ktp: DataTypes.STRING,
      birthplace: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      religion: DataTypes.STRING,
      bloodtype: DataTypes.STRING,
      marriage: DataTypes.STRING,
      ktpaddress: DataTypes.TEXT,
      currentaddress: DataTypes.TEXT,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      pic: DataTypes.STRING,
      skill: DataTypes.TEXT,
      placement: DataTypes.BOOLEAN,
      salary: DataTypes.BIGINT
    },
    {
      timestamps: true
    },
  )
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { foreignKey: 'user_id', as: 'profile' })
    Profile.hasMany(models.Education, { foreignKey: 'profile_id', as: 'education' })
    Profile.hasMany(models.Experience, { foreignKey: 'profile_id', as: 'experience' })
    Profile.hasMany(models.Course, { foreignKey: 'profile_id', as: 'course' })
  };
  Profile.sync({ alter: false })
  return Profile
}