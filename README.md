# Achievement Gym

Achievement Gym is a Node.js/TypeScript backend project for managing gym operations, including user authentication, session management, exercise tracking, and profile management for coaches and members.

## Features

- User authentication (sign up, sign in, password reset)
- Coach and member profile management
- Exercise and progress tracking
- Session scheduling and status updates
- File uploads (e.g., avatars)
- Validation and middleware for security

## Project Structure

```
src/
  config/           # Configuration files (DB, Cloudinary, dotenv)
  controllers/      # Route controllers (exercises, profiles, sessions, users)
  interfaces/       # TypeScript interfaces
  middleWares/      # Express middlewares (auth, validation, file upload)
  models/           # Mongoose models (coach, member, session, etc.)
  routes/           # Express route definitions
  uploads/          # Uploaded files
  utils/            # Utility functions (email, response handling)
  validations/      # Joi validation schemas
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance

### Installation

1. Clone the repository:
   ```powershell
   git clone https://github.com/AliIbrahim535942/AchievementGym.git
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in your values.

### Running the Project

```powershell
npm run start
```

Or for development with auto-reload:

```powershell
npm run dev
```

## API Endpoints

- `/api/users` - User authentication routes
- `/api/profiles` - Coach/member profile routes
- `/api/exercises` - Exercise and progress routes
- `/api/sessions` - Session management routes

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
