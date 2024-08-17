'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    profile_id: DataTypes.INTEGER,
    course_name: DataTypes.STRING,
    certificate: DataTypes.BOOLEAN,
    year: DataTypes.INTEGER
  }, {
    timestamps: true
  });
  Course.associate = (models) => {
    Course.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'course' })
  };
  Course.sync({ alter: false })
  return Course;
};