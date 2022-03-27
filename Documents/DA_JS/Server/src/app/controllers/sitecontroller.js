const jwt = require('jsonwebtoken')
const model = require('../Model/index')
const account = require('../Model/auth')
const { multipleDataToObject } = require('../../ulti/mongoose')

require('dotenv').config()

class SiteController {
	// [GET] index news
	home(req, res, next) {
		model
			.find({})
			.then((model) => {
				res.json(model)
			})
			.catch(next)
	}

	//[POST] Login account
	async login(req, res, next) {
		console.log(req.body)
		const data = req.body
		const { name, mk } = req.body
		const check = await account.findOne({ account: name }, { password: mk })
		if (check) {
			const accesstoken = jwt.sign(
				{ userId: check._id },
				process.env.ACCESS_JWT_SECRET
			)
			res.status(200).json({
				status: 'success',
				message: 'Login successful',
				accesstoken
			})
		} else {
			res.status(400).json({
				status: 'error',
				message: 'Incorrect username or password'
			})
		}
	}

	//[POST] search
	search(req, res) {
		res.render('search')
	}

	//[GET] read
	fetchAcc(req, res) {
		account.find({}, function (err, docs) {
			if (err) {
				res.send(err)
			}
			res.send(docs)
		})
	}
}

module.exports = new SiteController()
