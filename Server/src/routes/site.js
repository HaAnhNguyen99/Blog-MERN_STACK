const express = require('express')
const router = express.Router()
const cors = require('cors')
const siteController = require('../app/controllers/sitecontroller')

router.use(cors())
router.get('/search', siteController.search)
router.post('/login', siteController.login)
router.get('/read', siteController.fetchAcc)
router.get('/', siteController.home)

module.exports = router
