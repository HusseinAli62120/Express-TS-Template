# Express-Typescript-Template

This is a backend template for Node.js using Express with TypeScript, to ease the setup of a backend project. It also comes with script-based environment detection and the following packages:

- nodemon
- JWT
- dotenv
- cors
- cookie-parser
- bcrypt

### Getting Started:

To use this template, fork the repo or use this template. Then, once you have it in an IDE, run the following:

1. `npm install`
2. Run different commands for different environments
    1. To run the development environment (use .env.development) 
    run: **`npm run dev`  
    📌** This is the one we use for development.
    2. To run the development environment but with the testing variables (use .env.testing)
    run: **`npm run test`  
    📌** Use this to test the testing environment.
    3. To deploy the backend with the testing variables (use .env.testing)
    run: **`npm run start:test`  
    📌** Use this if you have a backend deployed only for testing.
    4. To deploy the backend with the production variables (use .env.production)
    run: **`npm build`  
    📌** Use this when deploying the backend.

📌 Make sure to read the notes below.

### Structure:

The main entry point of the app is the **index.ts** file. You should only use this file to add your routes or add new packages. You can change everything else if needed, but it is set up for most cases.

The template also comes with the following directories:

- **routes:** for route definition (Currently holds a test auth route)  
📌 Delete the test route.
- **controllers:** for route logic (Currently holds a test login, logout, and test functions)  
📌 Add your logic to the login, logout functions and delete the test one.
- **middlewares:** for middleware definition. (Currently holds an authentication middleware)
- **types:** for type definitions
- **utils:** for utility functions (currently holds “checkEnvironment.ts”)

---

### Some Notes:

- **This template already has three .env files,** but when you’re actually using it, make sure to uncomment the first line in **.gitignore** to avoid accidentally pushing your .env files.
- If your backend does not have authentication (login, logout, etc.) you can delete the following:
    - **requestWithUser** type in the types directory.
    - **authMiddleware** in middlewares directory.
    - And you can also uninstall **bcrypt** and **jsonwebtoken** and their types   (in devDependencies) if you don’t need them.
- In the .env files
    - **The BACKEND_URL & PORT** are used only by the **app.listen** to display the environment on running the app. But they are not used in any logic. So don’t worry to much about them.
    - **Do not add NODE_ENV to any .env file, since it is added on run by the cross-env package.**
    - Change the token secrets into something random, open a gitBash terminal and run:  
    `head -c 64 /dev/urandom | base64`
