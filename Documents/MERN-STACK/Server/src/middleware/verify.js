const jwt = require('jsonwebtoken')
const verify = (req, res, next) => {
	const authheader = req.header('Authorization')
	const token = authheader && authheader.split(' ')[1]
	
	if (!token)
		return res
			.status(401)
			.json({ status: 'false', message: 'Chưa đăng nhập ' })
	else {
		try {
			const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET)
			req.account = decoded.account
			next()
		} catch (error) {
			console.log(error)
			return res
				.status(403)
				.json({ status: 'false', message: 'Invalid token!!' })
		}
	}
}
module.exports = verify
