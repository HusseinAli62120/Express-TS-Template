const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env.development";

export default envPath;

// This is used to check the environment and use the correcponding .env file
