import express from "express";
import { RequestWithUser } from "../types/requestWithUser";
// Test
const testController = async (req: RequestWithUser, res: express.Response) => {
  try {
    return res
      .status(200)
      .json({ message: `Test Sucessful for the ${process.env.NODE_ENV}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { testController };
