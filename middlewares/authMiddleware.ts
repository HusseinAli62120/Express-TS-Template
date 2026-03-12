import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestWithUser } from "../types/requestWithUser";

const authMiddleware = async (
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid authorization header" });
  }

  const token = authHeader?.split(" ")[1];

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    console.error("ACCESS_TOKEN_SECRET not set");
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const payload = jwt.verify(token, accessTokenSecret, {
      algorithms: ["HS256"],
    }) as JwtPayload;
    req.user = payload;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { authMiddleware };
