
# Blog Task Project

This README provides step-by-step instructions to set up and run the **Blog Task** project. Please follow these steps carefully.

---

## Prerequisites

1. **Node.js** (Version 20 or later is recommended)
2. **pnpm** (Package Manager)
3. **PostgreSQL** (Ensure it's installed and running locally)
4. **Docker** (For the optional Dockerized setup)
5. **VPN** (Required for accessing Firebase APIs)

---

## Step 1: Set Up Environment Variables

1. Create a `.env` file in the root of the project.
2. Copy and paste the following content into the `.env` file:

```env
APP_NAME=blog_task
APP_PORT=3000
APP_SECRET=0cCRLZMBjRf0jaos4RRMVRIKZ8Dt4zDVMYCotVnc
DOC_PATH=/api/docs
APP_DOMAIN=localhost:3000
APP_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog_task
TYPEORM_SYNC=true

FIREBASE_API_KEY=AIzaSyCIQg4y1o7UN65M_zpmowJKXorjex0iMGE
```

---

## Step 2: Set Up the Database

1. Open your PostgreSQL client or terminal.
2. Create a new database named `blog_task`:

   ```sql
   CREATE DATABASE blog_task;
   ```

3. Ensure your `.env` database configurations (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) match your local PostgreSQL setup.

---

## Step 3: Install Dependencies

1. Install all project dependencies using **pnpm**:

   ```bash
   pnpm install
   ```

---

## Step 4: Run the Application Locally

1. Start the development server:

   ```bash
   pnpm start:dev
   ```

2. The application will run at [http://localhost:3000](http://localhost:3000).

---

## Step 5: Import Postman Collection

1. Open **Postman**.
2. Navigate to `File > Import`.
3. Import the `Task.postman_collection.json` file located in the `/docs` directory of the project.

---

## Step 6: VPN Requirement

Ensure your **VPN** is active before testing the APIs, as Firebase requires VPN access for some regions.

---

## Alternative Method: Run Using Docker

### Step 1: Ensure `.env` is Configured
Make sure your `.env` file is set up as described in **Step 1**.

### Step 2: Build the Docker Image

1. Build the project using Docker Compose:

   ```bash
   docker-compose build --no-cache
   ```

### Step 3: Run the Docker Container

1. Start the container with the following command:

   ```bash
   docker run --name blog_task_01 -p 3000:3000 blog_task-app:latest
   ```

2. The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Notes

- Before testing the APIs, ensure the database is configured, and your VPN is active.
- If you encounter any issues, check the logs of the running server for debugging.

Enjoy using the **Blog Task** application!
