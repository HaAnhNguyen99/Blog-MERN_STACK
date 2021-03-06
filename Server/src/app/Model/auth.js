const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
	account: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profilePic: { type: String, default: 'default.png' }
})

const 	account = mongoose.model('accountdata', accountSchema)
module.exports = account
