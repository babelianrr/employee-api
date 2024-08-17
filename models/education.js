'use strict';
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    profile_id: DataTypes.INTEGER,
    level: DataTypes.STRING,
    institution: DataTypes.STRING,
    major: DataTypes.STRING,
    graduate: DataTypes.INTEGER,
    gpa: DataTypes.FLOAT
  }, {
    timestamps: true
  })
  Education.associate = (models) => {
    Education.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'education' })
  };
  Education.sync({ alter: false })
  return Education;
};