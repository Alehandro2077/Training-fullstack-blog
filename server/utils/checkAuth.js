import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret228");

      req.userId = decoded._id;

      next();
    } catch (error) {
      return res.status(403).json({ messsage: "PERMISSION DENIED" });
    }
  } else {
    return res.status(403).json({
      message: "PERMISSION DENIED",
    });
  }
};
