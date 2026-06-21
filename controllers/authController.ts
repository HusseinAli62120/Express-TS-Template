import express from "express";

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

// login
const login = async (req: express.Request, res: express.Response) => {
  try {
    // Your logic

    return res.status(200).json({ message: "Login Sucessful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// logout
const logout = async (req: express.Request, res: express.Response) => {
  try {
    // Your logic

    return res.status(200).json({ message: "Logout Sucessful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login, logout, testController };
