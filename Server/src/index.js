const express = require('express')
// const morgan = require('morgan')
const path = require('path')
const router = require('./routes')
const cors = require('cors')
const multer = require('multer')
//connect to db
const db = require('./config/db')
db.connect()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true
	})
)

app.use(express.static(__dirname))

// http logger
// app.use(morgan('combined'))

//config multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '/images/'))
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name)
	}
})

const upload = multer({ storage: storage })
app.post('/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded')
})

//route initial
router(app)

app.listen(port, () =>
	console.log('Listening to port: http://localhost:' + port)
)
