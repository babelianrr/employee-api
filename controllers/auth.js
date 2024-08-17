const { User } = require('../models')
const Validator = require('validatorjs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const rules = {
    email: 'required|email',
    password: 'required'
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails())
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    })

  try {
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const alreadyExist = await User.findOne({
      where: { email: req.body.email }
    });

    if (alreadyExist) {
      return res.status(400).send({
        message: 'User already exist'
      })
    };

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.TOKEN_KEY)

    res.status(201).send({
      status: true,
      data: {
        user: { id: newUser.id, email: newUser.email },
        token
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: 'Server Error'
    })
  }
}

exports.login = async (req, res) => {
  const rules = {
    email: 'required|email',
    password: 'required'
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails())
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    })

  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    const isValid = await bcrypt.compare(req.body.password, userExist.password)

    if (!isValid) {
      return res.status(400).send({
        status: false,
        message: 'Invalid credentials',
      })
    }

    const token = jwt.sign({ id: userExist.id, email: userExist.email, role: userExist.role }, process.env.TOKEN_KEY)

    res.status(200).send({
      status: true,
      data: {
        user: {
          id: userExist.id,
          email: userExist.email,
          role: userExist.role
        },
        token
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: 'Server Error',
    })
  }
}

exports.checkAuth = async (req, res) => {

  try {
    const id = req.user.id
    const dataUser = await User.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    })

    if (!dataUser) {
      return res.status(404).send({
        status: false
      })
    }

    res.send({
      status: true,
      data: {
        user: {
          id: dataUser.id,
          email: dataUser.email,
          role: dataUser.role
        }
      }
    })
  } catch (error) {
    console.log(error)
    res.status({
      status: false,
      message: 'Server Error'
    })
  }
}