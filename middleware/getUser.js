const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUserFromAuthToken = async (req, res, next) => {
  try {
    const AuthToken = req.header("AuthToken");
    if (!AuthToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: "auth/tkn-abs",
          message: "AuthToken not present in headers",
        },
      });
    }
    const payload = jwt.verify(AuthToken, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: {
        code: "auth/tkn-inc",
        message: "Authorisation failed - Access denied",
      },
    });
  }
};

module.exports = fetchUserFromAuthToken;
