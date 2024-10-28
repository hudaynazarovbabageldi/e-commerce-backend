const express = require('express');
const router = express.Router();

router.use('/banners', require('./routes/bannerRouter'));

module.exports = router;
