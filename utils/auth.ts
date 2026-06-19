import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { username } from "better-auth/plugins";
import { validationRegex } from "./values";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter,
});
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username({
      usernameValidator: (username) => {
        // Allow only alphanumeric characters, underscores, and hyphens
        return validationRegex.test(username);
      },
    }),
  ],
  //   Add our additional attributes into the Better auth session context
  user: {
    additionalFields: {
      role: {
        type: "string", // Better Auth reads enums as strings natively
        required: true,
        defaultValue: "USER",
      },
    },
  },
});
