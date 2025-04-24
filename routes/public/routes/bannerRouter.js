const express = require('express');
const { getAllBanners, getBanner } = require('../../../controllers/public/bannerController');
const { tokenChecker } = require('../../../controllers/admin/adminController');
const router = express.Router();

router.get('/', getAllBanners);
router.get('/:id', tokenChecker, getBanner);

module.exports = router;
