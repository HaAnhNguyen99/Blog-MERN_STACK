const express = require('express')
const router = express.Router()
const cors = require('cors')
// const multer = require('multer')
const siteController = require('../app/controllers/sitecontroller')
const verify = require('../middleware/verify')

router.use(cors())
router.get('/search', siteController.search)
router.put('/account/update/:id', verify, siteController.Update)
router.post('/login', siteController.login)
// router.get('/read', siteController.fetchAcc)
router.get('/', siteController.home)

module.exports = router
