const jwt = require('jsonwebtoken')
const verify = (req, res, next) => {
	const authheader = req.header('Authorization')
	const token = authheader && authheader.split(' ')[1]
	if (!token)
		return res
			.status(401)
			.json({ status: 'false', message: 'access token not found' })
	else {
		try {
			// console.log('req body trong verify', req.body)
			const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET)
			req.userId = decoded.userId
			// console.log('userID = ',req.userId) 	
			// console.log('decode: ', decoded)
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
