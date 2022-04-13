const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tintuc = new Schema(
	{
		author: { type: String, required: true },
		title: { type: String, required: true },
		content: { type: String, required: false },
		img: { type: String },
		categories: {
			type: Array,
			required: false
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.model('tintucs', tintuc)
