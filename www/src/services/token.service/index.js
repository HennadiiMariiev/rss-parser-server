const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } = require('../../config/config');
const { Admin } = require('../../model/admin.schema');

const generateTokens = (payload) => {
  const accessToken = jwt.sign({ payload }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ payload }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

const saveRefreshToken = async (userId, refreshToken) => {
  await Admin.findByIdAndUpdate(
    userId,
    {
      refreshToken,
    }
  );
};

const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (_) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (_) {
    return null;
  }
};

const findAdminByToken = async (refreshToken) => {
  try {
    return await Admin.findOne({ refreshToken: refreshToken });
  } catch (error) {
    return error;
  }
};

const removeToken = async (refreshToken) => {
  try {
    return await Admin.findOneAndUpdate(
      { refreshToken },
      {
        $set: {
          refreshToken: null,
        },
      },
      { new: true }
    );
  } catch (error) {
    return error;
  }
};

module.exports = {
  generateTokens,
  saveRefreshToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findAdminByToken,
};
