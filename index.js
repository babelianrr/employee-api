// import dotenv and call config function to load environment
require('dotenv').config()
const express = require('express')
const { Sequelize } = require('sequelize')
const cors = require('cors')

const sequelize = new Sequelize('db_pegawai', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
})

const router = require('./routes')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000"
}))
app.use('/api', router)

app.listen(port, () => console.log(`Listening on port ${port}!`))

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}