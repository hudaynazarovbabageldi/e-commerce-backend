const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Banners } = require('../../db/models');

const storage = multer.memoryStorage();

exports.upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional 5mb
});

exports.addBanner = catchAsync(async (req, res, next) => {
  const newBanner = await Banners.create(req.body);
  return res.status(201).send(newBanner);
});
exports.editBanner = catchAsync(async (req, res, next) => {
  const banner_id = req.params.id;
  const banner = await Banners.findOne({ where: { id: banner_id } });

  if (!banner) {
    return next(new AppError('Banner did not find with that id', 404));
  }
  await banner.update(req.body);
  return res.status(200).send(banner);
});

exports.uploadBannerImageTm = catchAsync(async (req, res, next) => {
  const banner_id = req.params.id;
  const banner = await Banners.findOne({ where: { id: banner_id } });
  console.log('banner: ', banner);
  console.log('req.file: ', req.file);

  if (!banner) return next(new AppError('Banner not found with that id', 404));
  if (!req.file) return res.status(400).json({ message: 'No image file provided' });

  const image_tm = `${banner_id}_banner-tm.webp`;

  // Ensure the static directory exists

  // const staticDir = require('../../static');
  const staticDir = path.resolve(__dirname + '../../static');
  console.log('staticDir: ', staticDir);

  if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

  const filePath = path.join(staticDir, image_tm);
  console.log('image_tm: ', image_tm);
  console.log('filePath: ', filePath);

  try {
    const buffer = await sharp(req.file.buffer).webp().toBuffer();
    console.log('buffer: ', buffer);
    await sharp(buffer).toFile(filePath);
  } catch (err) {
    return next(new AppError(`Error saving image: ${err.message}`, 500));
  }

  await banner.update({ image: image_tm });

  return res.status(201).send(banner);
});

// exports.uploadBannerImageTm = catchAsync(async (req, res, next) => {
//   const banner_id = req.params.id;
//   const banner = await Banners.findOne({ where: { id: banner_id } });
//   console.log('File:', req.file); // Debugging the uploaded file

//   if (!banner) {
//     return next(new AppError('Banner did not found with that id', 404));
//   }

//   if (!req.file) {
//     return res.status(400).json({ message: 'No image file provided' });
//   }
//   const image_tm = `${banner_id}_banner-tm.webp`;
//   let buffer = await sharp(req.file.buffer).webp().toBuffer();

//   await sharp(buffer).toFile(`static/${image_tm}`);

//   await banner.update({
//     image_tm,
//   });

//   return res.status(201).send(banner);
// });

exports.uploadBannerImageRu = catchAsync(async (req, res, next) => {
  const banner_id = req.params.id;
  const banner = await Banners.findOne({ where: { id: banner_id } });
  req.files = Object.values(req.files);
  if (!banner) {
    return next(new AppError('Banner did not found with that id', 404));
  }
  const image_ru = `${banner_id}_banner-ru.webp`;
  const photo = req.files[0].data;
  let buffer = await sharp(photo).webp().toBuffer();

  await sharp(buffer).toFile(`static/${image_ru}`);

  await banner.update({
    image_ru,
  });

  return res.status(201).send(banner);
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const banner_id = req.params.id;
  console.log('banner_id: ', banner_id);

  const banner = await Banners.findOne({ where: { id: banner_id } });

  if (!banner) {
    return next(new AppError('Banner did not found with id', 404));
  }
  if (banner.image) {
    fs.unlink(`static/${banner.image}.webp`, function (err) {
      if (err) {
        return next(new AppError(err, 500));
      }
    });
  }

  await banner.destroy();

  res.status(200).send('Banner deleted successfully');
});
