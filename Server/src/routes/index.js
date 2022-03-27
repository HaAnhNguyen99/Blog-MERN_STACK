const siteroutes = require('./site')
const blogroutes = require('./blog')
function route(app) {
	app.use('/blog', blogroutes)
	app.use('/', siteroutes)
}

module.exports = route
