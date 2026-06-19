import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";
dotenv.config({});

const environment = process.env.NODE_ENV;
const connectionString = `${environment ? process.env.DATABASE_URL : null}`;
// console.log(`connectionString: ${connectionString}`);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
