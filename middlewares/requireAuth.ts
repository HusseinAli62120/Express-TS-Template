import express from "express";
import { auth } from "../utils/auth";
import { RequestWithUser } from "../types/requestWithUser";

const requireAuth = async (
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    // Get the session info from the cookie
    const session = await auth.api.getSession({ headers: req.headers as any });

    if (!session) {
      return res
        .status(401)
        .json({ message: "Missing or invalid authorization header" });
    }

    // Add the user info that you need
    const payload = {
      id: session?.user?.id,
      name: session?.user?.name,
      username: session?.user?.username,
      role: session?.user?.role,
    };

    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { requireAuth };
