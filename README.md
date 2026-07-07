# CollegeGram

CollegeGram is an Instagram-style social web app built for college communities. Users can register, share photo posts, like and save content, follow other users, and manage their profile — all through a mobile-first React UI backed by a Node.js REST API.

## Features

- **Authentication** — Register, login, logout with JWT stored in HTTP-only cookies
- **Posts** — Create posts with image upload, browse a real-time feed, delete your own posts
- **Likes** — Like and unlike posts
- **Saved posts** — Bookmark posts and view them on the Saved page
- **Follow system** — Search users and follow/unfollow them
- **Profile** — View your posts, follower/following counts, and account details
- **Protected routes** — Authenticated pages require a valid session

## Tech Stack

| Layer    | Technologies                                      |
| -------- | ------------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS 4, React Router, Axios |
| Backend  | Node.js, Express 5, MongoDB, Mongoose           |
| Auth     | JWT, bcryptjs, cookie-parser                      |
| Uploads  | Multer (local file storage)                       |

## Project Structure

```
zahid/
├── backend/
│   ├── server.js                 # App entry point (port 3000)
│   ├── uploads/                  # Uploaded post images
│   └── src/
│       ├── app.js                # Express config & routes
│       ├── config/database.js    # MongoDB connection
│       ├── controllers/          # Route handlers
│       ├── middleware/           # Auth & file upload
│       ├── models/               # Mongoose schemas
│       └── routes/               # API route definitions
│
└── frontEnd/
    └── src/
        ├── lib/api.js            # Shared Axios instance
        └── features/
            ├── auth/             # Login, register, context, guards
            ├── home/             # Feed shell, nav, profile, search
            └── post/             # Posts, create post, likes
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd zahid
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/collegegram
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend:

```bash
npm run dev
```

The API runs at **http://localhost:3000**.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontEnd
npm install
npm run dev
```

The app runs at **http://localhost:5173**.

## Environment Variables

| Variable     | Location        | Description                          |
| ------------ | --------------- | ------------------------------------ |
| `MONGO_URI`  | `backend/.env`  | MongoDB connection string            |
| `JWT_SECRET` | `backend/.env`  | Secret key for signing JWT tokens    |

## API Reference

Base URL: `http://localhost:3000/api`

All protected routes require a valid `token` cookie (set automatically on login/register).

### Auth — `/api/auth`

| Method | Endpoint              | Auth | Description                |
| ------ | --------------------- | ---- | -------------------------- |
| POST   | `/register`           | No   | Create a new account       |
| POST   | `/login`              | No   | Log in                     |
| POST   | `/logout`             | No   | Log out (clears cookie)    |
| GET    | `/me`                 | Yes  | Current user + stats       |
| GET    | `/search?q=username`  | Yes  | Search users by username   |
| GET    | `/profile/:userName`  | Yes  | Get a user's profile       |

### Posts — `/api/posts`

| Method | Endpoint            | Auth | Description                    |
| ------ | ------------------- | ---- | ------------------------------ |
| POST   | `/`                 | Yes  | Create post (multipart: `photo`, `caption`) |
| GET    | `/`                 | Yes  | Get feed                       |
| GET    | `/user/:userName`   | Yes  | Get posts by user              |
| DELETE | `/:id`              | Yes  | Delete own post                |

### Likes — `/api/likes`

| Method | Endpoint    | Auth | Description  |
| ------ | ----------- | ---- | ------------ |
| POST   | `/:postId`  | Yes  | Like a post  |
| DELETE | `/:postId`  | Yes  | Unlike a post |

### Follows — `/api/follows`

| Method | Endpoint      | Auth | Description      |
| ------ | ------------- | ---- | ---------------- |
| POST   | `/:userName`  | Yes  | Follow a user    |
| DELETE | `/:userName`  | Yes  | Unfollow a user  |

### Saved — `/api/saved`

| Method | Endpoint    | Auth | Description           |
| ------ | ----------- | ---- | --------------------- |
| GET    | `/`         | Yes  | Get saved posts       |
| POST   | `/:postId`  | Yes  | Save a post           |
| DELETE | `/:postId`  | Yes  | Remove from saved     |

Uploaded images are served at `http://localhost:3000/uploads/<filename>`.

## Frontend Routes

| Path          | Page        | Access        |
| ------------- | ----------- | ------------- |
| `/`           | Redirect    | Public        |
| `/login`      | Login       | Guest only    |
| `/register`   | Register    | Guest only    |
| `/home`       | Feed        | Authenticated |
| `/profile`    | Profile     | Authenticated |
| `/createPost` | New post    | Authenticated |
| `/search`     | Search      | Authenticated |
| `/saved`      | Saved posts | Authenticated |
| `/settings`   | Settings    | Authenticated |

## Scripts

### Backend (`backend/`)

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start server with nodemon |

### Frontend (`frontEnd/`)

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start Vite dev server    |
| `npm run build` | Production build         |
| `npm run lint`  | Run ESLint               |
| `npm run preview` | Preview production build |

## Development Notes

- The frontend sends requests with `withCredentials: true` so JWT cookies work across origins.
- CORS is configured for `http://localhost:5173` in `backend/src/app.js`.
- Post images are stored locally in `backend/uploads/`. For production, consider cloud storage (e.g. ImageKit, S3).
- Default profile pictures use an ImageKit CDN URL defined in the user model.

## License

ISC
