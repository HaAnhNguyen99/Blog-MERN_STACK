const mongoose = require('mongoose')
const Schema = mongoose.Schema

const token = new Schema({
	token: { type: String, required: true },
	date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('token', token)
