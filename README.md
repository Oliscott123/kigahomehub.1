# Kigali Home Hub

A modern real estate web app built with React, Tailwind CSS, Express, and MySQL.

## Features
- Browse available homes and apartments
- Search by location and price range
- View property details and gallery
- Admin dashboard for creating, updating, deleting listings
- Image upload support with Multer

## Setup
### Backend
1. Create a MySQL database named `kigalihomehub`.
2. Run the SQL in `backend/schema.sql`.
3. Copy `backend/.env.example` to `backend/.env` and update credentials.
4. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend
1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```

## Notes
- API base URL is `http://localhost:4000/api` by default.
- Uploaded images are stored in `backend/uploads`.
- Use the login page at `/login` to access the admin dashboard.
- Default admin credentials are `admin` / `password` unless changed in `backend/.env`.

## Deploying to Vercel
This repository deploys the React frontend to Vercel. The Express/MySQL backend needs its own host, because it depends on a persistent MySQL database and uploaded files.

1. Remove any old Vercel config that contains a `services` property. Vercel now rejects that field.
2. In Vercel, set the project root to the repository root or to `frontend`.
   - Repository root works with the root `vercel.json`.
   - `frontend` works with `frontend/vercel.json`.
3. Set the frontend environment variable:
   ```bash
   VITE_API_URL=https://your-backend-domain.example/api
   ```
4. Add the custom domain in Vercel as `kigalihomehub.space` and confirm the DNS records Vercel gives you.
