const express = require('express');
const {
  addBanner,
  deleteBanner,
  editBanner,
  uploadBannerImageRu,
  uploadBannerImageTm,
  upload,
} = require('../../../controllers/admin/bannerController');
const { tokenChecker } = require('../../../controllers/admin/adminController');
const router = express.Router();

router.post('/', tokenChecker, addBanner);
router.put('/:id', tokenChecker, editBanner);
router.delete('/:id', tokenChecker, deleteBanner);
router.post('/upload-imageTm/:id', tokenChecker, upload.single('image'), uploadBannerImageTm);
router.post('/upload-imageRu/:id', tokenChecker, upload.single('image'), uploadBannerImageRu);
module.exports = router;
