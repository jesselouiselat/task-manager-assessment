import { verifyToken } from "../configs/auth.js";

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Access denied. Token missin or malformed" });
    }
    const token = authHeader.split(" ")[1];
    const decodedPayload = verifyToken(token);

    req.user = {
      userId: decodedPayload.id,
    };
    console.log(req.user);

    next();
  } catch (error) {
    console.error("JWT Authentication Gate Failure", error.message);
    return res
      .status(401)
      .json({ error: "Invalid, Expired or Compromised Session Token" });
  }
};
