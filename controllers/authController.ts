import express from "express";
import { auth } from "../utils/auth";
import { isAPIError } from "better-auth/api";
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

// Signup
const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password, name } = req.body;

    if (!userName || !password || !name) {
      return res.status(400).json({ message: "Bad Request Parameters" });
    }

    // Check if the user already exists
    const response = await auth.api.isUsernameAvailable({
      body: {
        username: userName,
      },
    });

    // Not available to be created, so already exists
    if (!response.available) {
      return res.status(409).json({ message: "Username Already Exists" });
    }

    // If you want an actual email, have the user provide it in the frontend and pass it instead.
    // Generate a unique email using Date.now()
    const dummyEmail = `dummyEmail-${userName}-${Date.now()}@domain.com`;

    const user = await auth.api.signUpEmail({
      body: {
        email: dummyEmail,
        name: name,
        password: password,
        username: userName,
      },
    });

    return res.status(200).json({
      message: "User Created successfully",
      user: user,
    });
  } catch (error: any) {
    console.log(error);

    // Check if the error was thrown directly by Better Auth
    if (isAPIError(error)) {
      const authError = error as any;
      return res.status(authError?.statusCode || 500).json({
        message: authError.body.message,
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// login
const login = async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password } = req.body;
    console.log(userName, password);

    if (!userName || !password) {
      return res.status(400).json({ message: "Bad Request Parameters" });
    }

    // Check if the user exists
    const isAvailable = await auth.api.isUsernameAvailable({
      body: {
        username: userName,
      },
    });

    // Since it is available to be created, that means there is no user with such name.
    if (isAvailable?.available) {
      return res.status(400).json({ message: "Username Not Found" });
    }

    const user = await auth.api.signInUsername({
      body: {
        username: userName,
        password: password,
      },
    });

    return res.status(200).json({
      message: "Login Sucessful",
      user: user,
    });
  } catch (error) {
    console.log(error);

    if (isAPIError(error)) {
      const authError = error as any;
      return res.status(authError?.statusCode || 500).json({
        message: authError.body.message,
      });
    }
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

export { login, logout, testController, signup };
