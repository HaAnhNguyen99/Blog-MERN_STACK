const multer = require('multer')
const jwt = require('jsonwebtoken')
const model = require('../Model/index')
const account = require('../Model/auth')
const bcrypt = require('bcrypt')
require('dotenv').config()

class SiteController {
	// [GET] index news
	home(req, res, next) {
		model
			.find({})
			.then((model) => {
				res.status(200).json(model)
			})
			.catch(next)
	}

	//[POST] Login account
	async login(req, res, next) {
		const data = req.body
		const { name, mk } = req.body
		const check = await account.findOne({ account: name, password: mk })

		if (check) {
			const accesstoken = jwt.sign(
				{ userId: check.account },
				process.env.ACCESS_JWT_SECRET
			)
			res.status(200).json({
				status: 'success',
				message: 'Login successful',
				userId: check._id,
				user: check.account,
				profilePic: check.profilePic,
				accesstoken
			})
		} else {
			res.status(400).json({
				status: 'error',
				message: 'Incorrect username or password'
			})
		}
	}

	//[PUT] Update account
	async Update(req, res, next) {
		try {
			const id = req.body.userId
			const { password, profilePic, accesstoken } = req.body
			const update = await account.findByIdAndUpdate(
				id,
				{
					password,
					profilePic
				},
				{ new: true }
			)
			const resData = {
				accesstoken,
				user: update.account,
				userId: update._id,
				profilePic: update.profilePic
			}
			res.status(200).json(resData)
		} catch (err) {
			res.status(500).json(err)
		}
	}
	//[POST] search
	search(req, res) {
		res.render('search')
	}
}

module.exports = new SiteController()
