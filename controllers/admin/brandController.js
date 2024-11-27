const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Brands } = require('../../db/models');

const storage = multer.memoryStorage();

exports.upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional 5mb
});

exports.addBrand = catchAsync(async (req, res, next) => {
  console.log('add brand req: ', req.body);
  const { name_tm, name_ru, name_en } = req.body;
  if (!name_tm || !name_en || !name_ru) {
    return next(new AppError('name_tm, name_ru, name_en are required', 401));
  }
  const newBrand = await Brands.create(req.body);
  return res.status(201).send(newBrand);
});

exports.editBrand = catchAsync(async (req, res, next) => {
  const brand_id = req.params.id;
  const brand = await Brands.findOne({ where: { id: brand_id } });

  if (!brand) {
    return next(new AppError('Brand did not find with that id', 404));
  }
  await brand.update(req.body);
  return res.status(200).send(brand);
});

exports.uploadBrandImageTm = catchAsync(async (req, res, next) => {
  const brand_id = req.params.id;
  const brand = await Brands.findOne({ where: { id: brand_id } });

  if (!banner) return next(new AppError('Brand not found with that id', 404));
  if (!req.file) return res.status(400).json({ message: 'No image file provided' });

  const image_tm = `${brand_id}_brand-tm.webp`;

  const staticDir = path.resolve(__dirname + '../../static');
  console.log('staticDir: ', staticDir);

  if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

  const filePath = path.join(staticDir, image_tm);
  console.log('image_tm: ', image_tm);
  console.log('filePath: ', filePath);

  try {
    const buffer = await sharp(req.file.buffer).webp().toBuffer();

    await sharp(buffer).toFile(filePath);
  } catch (err) {
    return next(new AppError(`Error saving image: ${err.message}`, 500));
  }

  await banner.update({ image: image_tm });

  return res.status(201).send(banner);
});

exports.uploadBrandImageRu = catchAsync(async (req, res, next) => {
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

exports.deleteBrand = catchAsync(async (req, res, next) => {
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
