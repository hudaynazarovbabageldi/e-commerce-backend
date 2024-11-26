const express = require('express');
const router = express.Router();
const { login, register } = require('../../controllers/admin/adminController');

router.post('/register', register);
router.post('/login', login);

router.use('/banners', require('./routes/bannerRouter'));

module.exports = router;
