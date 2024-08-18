const { Profile, Education, Course, Experience } = require('../models')
const moment = require('moment')

exports.getProfiles = async (req, res) => {
  try {
    let data
    if (req.query.filter && req.query.filter_value) {
      if (req.query.filter === 'education') {
        data = await Profile.findAll({
          where: {
            '$Education.level$': req.query.filter_value
          },
          include: [
            {
              model: Education,
              as: 'education',
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            },
          ],
          attributes: ['id', 'name', 'birthplace', 'birthdate', 'position']
        })
      } else {
        data = await Profile.findAll({
          where: {
            [req.query.filter]: req.query.filter_value
          },
          attributes: ['id', 'name', 'birthplace', 'birthdate', 'position']
        })
      }
    } else if (!req.query.filter && req.query.filter_value) {
      data = await Profile.findAll({
        where: {
          ['name']: req.query.filter_value
        },
        attributes: ['id', 'name', 'birthplace', 'birthdate', 'position']
      })
    } else {
      data = await Profile.findAll({
        attributes: ['id', 'name', 'birthplace', 'birthdate', 'position']
      })
    }

    res.status(200).send({
      status: true,
      data
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: 'Server Error',
    })
  }
}

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Profile.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: Education,
          as: 'education',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: Course,
          as: 'course',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: Experience,
          as: 'experience',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      ]
    })

    res.status(200).send({
      status: true,
      data
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: 'Server Error',
    })
  }
}

exports.getProfileUser = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Profile.findOne({
      where: {
        user_id: id
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: Education,
          as: 'education',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: Course,
          as: 'course',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: Experience,
          as: 'experience',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      ]
    })

    res.status(200).send({
      status: true,
      data
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: 'Server Error',
    })
  }
}

exports.addProfile = async (req, res) => {
  try {
    const isExist = await Profile.findOne({
      where: {
        user_id: req.user.id
      }
    })

    if (isExist)
      return res.status(400).send({
        status: false,
        message: 'Profile already exists.'
      })

    const data = await Profile.create({
      user_id: req.user.id,
      position: req.body.position,
      name: req.body.name,
      ktp: req.body.ktp,
      birthplace: req.body.birthplace,
      birthdate: moment(req.body.birthdate, 'YYYY-MM-DD'),
      gender: req.body.gender,
      religion: req.body.religion,
      bloodtype: req.body.bloodtype,
      marriage: req.body.marriage,
      ktpaddress: req.body.ktpaddress,
      currentaddress: req.body.currentaddress,
      email: req.body.email,
      phone: req.body.phone,
      pic: req.body.pic,
      skill: req.body.skill,
      placement: req.body.placement,
      salary: req.body.salary
    })

    const educations = req.body.education.map((v, k) => {
      return {
        profile_id: data.id,
        ...v
      }
    })

    const courses = req.body.course.map((v, k) => {
      return {
        profile_id: data.id,
        ...v
      }
    })

    const experiences = req.body.experience.map((v, k) => {
      return {
        profile_id: data.id,
        ...v
      }
    })

    const education = await Education.bulkCreate(educations)
    const course = await Course.bulkCreate(courses)
    const experience = await Experience.bulkCreate(experiences)

    res.status(201).send({
      status: true,
      data,
      education,
      course,
      experience
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: 'Server Error',
    })
  }
}

exports.editProfile = async (req, res) => {
  try {
    await Profile.update({
      id: req.body.id,
      user_id: req.user.id,
      position: req.body.position,
      name: req.body.name,
      ktp: req.body.ktp,
      birthplace: req.body.birthplace,
      birthdate: moment(req.body.birthdate, 'YYYY-MM-DD'),
      gender: req.body.gender,
      religion: req.body.religion,
      bloodtype: req.body.bloodtype,
      marriage: req.body.marriage,
      ktpaddress: req.body.ktpaddress,
      currentaddress: req.body.currentaddress,
      email: req.body.email,
      phone: req.body.phone,
      pic: req.body.pic,
      skill: req.body.skill,
      placement: req.body.placement,
      salary: req.body.salary
    }, {
      where: {
        user_id: req.user.id
      }
    })

    const educations = req.body.education.map((v, k) => {
      return {
        profile_id: req.body.id,
        ...v
      }
    })

    const courses = req.body.course.map((v, k) => {
      return {
        profile_id: req.body.id,
        ...v
      }
    })

    const experiences = req.body.experience.map((v, k) => {
      return {
        profile_id: req.body.id,
        ...v
      }
    })

    await Education.bulkCreate(educations, { updateOnDuplicate: ['id'] })
    await Course.bulkCreate(courses, { updateOnDuplicate: ['id'] })
    await Experience.bulkCreate(experiences, { updateOnDuplicate: ['id'] })

    res.status(200).send({
      status: true,
      data: req.body
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: 'Server Error',
    })
  }
}

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params
    await Education.destroy({
      where: { profile_id: id }
    })
    await Experience.destroy({
      where: { profile_id: id }
    })
    await Course.destroy({
      where: { profile_id: id }
    })
    await Profile.destroy({
      where: { id }
    })

    res.status(200).send({
      status: true,
      message: 'Successfully delete profile'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: 'Server Error',
    })
  }
}