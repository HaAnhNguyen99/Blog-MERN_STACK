const express = require('express')
const router = express.Router()
var cors = require('cors')

// Config bodyParser
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

const blogController = require('../app/controllers/blogcontroller')
const verifyToken = require('../middleware/verify')
//method
router.use(express.json())
router.use(urlencodedParser)
router.use(cors())

router.post('/new', verifyToken, blogController.new)
router.get('/store', verifyToken, blogController.store)
router.delete('/delete/:id', verifyToken, blogController.delete)
router.put('/update/:id', verifyToken, blogController.update)
router.get('/:id', blogController.show1blog)
router.get('/', blogController.show)
module.exports = router
