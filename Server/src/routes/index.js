const siteroutes = require('./site')
const blogroutes = require('./blog')
const categories = require('./categories')
function route(app) {
	app.use('/blog', blogroutes)
	app.use('/cat', categories)
	app.use('/', siteroutes)
}

module.exports = route
