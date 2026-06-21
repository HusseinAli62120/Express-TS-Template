import express from "express";

interface RequestWithUser extends express.Request {
  user: {
    id: string;
    name: string;
    username: string | null | undefined;
    role: string;
  };
}

export { RequestWithUser };
