const router = require('express').Router()
const cors = require('cors')
const Catcontroller = require('../app/controllers/catcontroller')

router.use(cors())
router.post('/', Catcontroller.postCat)
router.get('/', Catcontroller.getcat)

module.exports = router
