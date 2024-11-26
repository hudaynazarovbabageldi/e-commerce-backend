const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const { Admins } = require('../../db/models');
const AppError = require('../../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, 'babageldi', {
    expiresIn: '24h',
  });
};

const createSendToken = (admin, statusCode, res) => {
  const token = signToken(admin.id);
  res.status(statusCode).json({
    token,
    data: {
      admin,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    next(new AppError('Username, password, email are required', 400));
    return;
  }
  const conflictProperties = [];
  const checkUsernameUsed = await Admins.findOne({ where: { username } });
  if (checkUsernameUsed) {
    conflictProperties.push('username');
  }
  const checkEmailUsed = await Admins.findOne({ where: { email } });
  if (checkEmailUsed) {
    conflictProperties.push('email');
  }

  if (conflictProperties.length) {
    res.status(409).json({ status: 'conflict', conflictProperties });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);
  Admins.create({ email, username, password: hashPassword })
    .then(async (user) => {
      const payload = { id: user.id };
      const token = await jwt.sign(payload, process.env?.CLIENT_JWT_KEY, {
        expiresIn: '24h',
      });
      res.json({ token });
    })
    .catch((err) => {
      res.status({ status: 'failed', message: 'Something went wrong', err });
    });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  const admin = await Admins.findOne({ where: { username } });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  createSendToken(admin, 200, res);
});

exports.tokenChecker = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You can not login as admin!'), 401);
  }

  const decoded = await jwt.verify(token, 'babageldi');
  const freshAdmin = await Admins.findOne({ where: { id: decoded.id } });

  if (!freshAdmin) {
    return next(new AppError('The user belonging to this token is no longer exists', 401));
  }

  freshAdmin.password = undefined;
  req.admin = freshAdmin;
  next();
};

// {
//   "username": "Babon",
//   "email": "babydriverlogic01@gmail.com",
//   "password": "1001"

//  }
