'use strict';
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define('Experience',
    {
      profile_id: DataTypes.INTEGER,
      company: DataTypes.STRING,
      position: DataTypes.STRING,
      salary: DataTypes.BIGINT,
      year: DataTypes.INTEGER
    },
    {
      timestamps: true
    },
  )
  Experience.associate = (models) => {
    Experience.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'experience' })
  };
  Experience.sync({ alter: false })
  return Experience
}