import express from "express";
import { auth } from "../utils/auth";
// Test
const testController = async (req: express.Request, res: express.Response) => {
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
