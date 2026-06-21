import express from "express";

interface RequestWithUser extends express.Request {
  user: any;
}

export { RequestWithUser };
