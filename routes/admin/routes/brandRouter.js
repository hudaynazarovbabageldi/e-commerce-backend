const express = require('express');
const { addBrand, editBrand } = require('../../../controllers/admin/brandController');
const { tokenChecker } = require('../../../controllers/admin/adminController');
const router = express.Router();

router.post('/', tokenChecker, addBrand);
router.put('/:id', tokenChecker, editBrand);

module.exports = router;
