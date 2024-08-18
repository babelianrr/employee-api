const express = require('express')
const { auth } = require('../middlewares/auth')

const router = express.Router()

module.exports = router

const {
  register,
  login,
  checkAuth
} = require('../controllers/auth')

const {
  getProfile,
  getProfileUser,
  getProfiles,
  addProfile,
  editProfile,
  deleteProfile
} = require('../controllers/profile')

router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

router.get('/admin/profiles', auth, getProfiles)
router.get('/admin/profile/:id', auth, getProfile)
router.get('/profile/:id', auth, getProfileUser)
router.post('/profile', auth, addProfile)
router.put('/profile/:id', auth, editProfile)
router.delete('/profile/:id', auth, deleteProfile)