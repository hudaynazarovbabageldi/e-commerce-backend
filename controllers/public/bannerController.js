const catchAsync = require('../../utils/catchAsync');
const { Banners } = require('../../db/models');
const AppError = require('../../utils/appError');

exports.getAllBanners = catchAsync(async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset;

  const banners = await Banners.findAndCountAll({
    order: [['updatedAt', 'DESC']],
    limit: limit,
    offset: offset,
  });
  return res.status(200).send(banners);
});

exports.getBanner = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const banner = await Banners.findOne({
    where: {
      id: id,
    },
  });
  if (!banner) {
    return next(new AppError('Banner did not find with that id: ', 404));
  }

  return res.status(200).send({ banner });
});
