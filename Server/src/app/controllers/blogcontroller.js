const blog = require('../Model/index')
const account = require('../Model/auth')

class blogController {
	// [GET] show blog
	show(req, res, next) {
		blog.find()
			.then((blog) => {
				res.status(200).json(blog)
			})
			.catch(next)
	}

	//[GET] show 1 blog
	async show1blog(req, res) {
		try {
			const post = await blog.findById(req.params.id)
			res.status(200).json(post)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	// [POST] new blog
	async new(req, res) {
		// show req.body
		const { author, title, content, img } = req.body
		if (!title) {
			return res.json({
				status: 'fail',
				message: 'Missing title'
			})
		}

		const newblog = new blog({ author, title, content, img })
		try {
			await newblog.save()
			res.status(200).json({
				_id: newblog._id,
				status: 'success',
				message: 'Create blog success!!'
			})
		} catch (error) {
			console.log(error)
			res.status(401).json({
				status: 'fail',
				message: 'Create blog fail!!'
			})
		}
	}

	//[] See my blog
	async store(req, res, next) {
		try {
			console.log('req.body = ', req.body)
			const { account } = req.body
			const fetch = await blog.find({ author: account })
			console.log(fetch)
			res.json(fetch)
		} catch (err) {
			console.log(err)
			res.json({ status: err, message: 'Server crash' })
		}
	}
	//[PUT] update blog
	async update(req, res) {
		const { author, title, content } = req.body
		if (!title) {
			return res
				.status(400)
				.json({ status: 'fail', message: 'Missing content for title' })
		}

		try {
			let updateBlog = {
				author,
				title,
				content
			}
			const updateCondition = { _id: req.params.id, author }
			updateBlog = await blog.findOneAndUpdate(
				updateCondition,
				updateBlog,
				{ new: true }
			)

			if (!updateBlog) {
				return res
					.status(401)
					.json({ status: 'fail', message: 'Blog not found' })
			} else {
				res.json({
					status: 'success',
					message: 'Update successfully',
					post: updateBlog
				})
			}
		} catch (error) {
			console.log(error)
			res.status(400).json({
				status: 'error',
				message: 'Something went wrong captain!!'
			})
		}
		const fetch = await blog.find({ author }).populate('author', 'title')
		res.json(fetch)
	}

	//[DELETE] delete blog
	async delete(req, res) {
		try {
			const id = req.params.id
			// const { account } = req.body
			const fetch = await blog.findByIdAndDelete(id)
			if (!fetch) {
				return res.json({
					status: 'Fail',
					message: 'Không tìm thấy id Blog'
				})
			}
			res.json({ status: 'Success', message: 'Xoá thành công' })
		} catch (err) {
			res.json({ status: 'Fail', message: 'Xoá không thành công' })
			console.log(err)
		}
	}
}

module.exports = new blogController()
