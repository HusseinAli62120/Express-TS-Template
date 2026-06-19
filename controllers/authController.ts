import express from "express";
import { prisma } from "../utils/prismaClient";
import bcrypt from "bcrypt";
import { Role } from "../utils/values";

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
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Bad Request Parameters" });
    }

    // Check if the user already exists
    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (user) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default role of USER
    const createdUser = await prisma.user.create({
      data: {
        userName: userName,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    return res.status(200).json({
      message: "User Created successfully",
      user: {
        id: createdUser.id,
        userName: createdUser.userName,
        role: createdUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// login
const login = async (req: express.Request, res: express.Response) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Bad Request Parameters" });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect Username or Password" });
    }

    return res.status(200).json({
      message: "Login Sucessful",
      user: {
        id: user.id,
        userName: user.userName,
        role: user.role,
      },
    });
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

export { login, logout, testController, signup };
