const Category = require('../Model/categories')
class Catcontroller {
	//[POST] new cat
	async postCat(req, res) {
		const newCat = new Category(req.body)
		try {
			const savedCat = await newCat.save()
			res.status(200).json(savedCat)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	//[GET] get cat
	async getcat(req, res) {
		try {
			const cats = await Category.find()
			res.status(200).json(cats)
		} catch (err) {
			res.status(500).json(err)
		}
	}
}
module.exports = new Catcontroller()
