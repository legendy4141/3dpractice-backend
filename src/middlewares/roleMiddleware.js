export const roleMiddleware = (roleIds) => (req, res, next) => {
  if (roleIds) {
    if (roleIds.includes(req.user.securitytype)) {
      return next();
    } else {
      return res.status(401).json({ message: "Not Authorized" });
    }
  }
  next();
};
