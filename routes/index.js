const router = require('express').Router()
const apiRoutes = require('../routes/api');

router.use('/api', apiRoutes)

router.use((req, res)=> {
    return res.send('wrong route!')
})

module.exports = router;