# Task Manager UI

A modern React frontend application for task management with user authentication, built with TypeScript and Vite.

## Features

- 🔐 User registration and email verification
- 🚪 User login/logout with JWT authentication
- 👥 User management (CRUD operations)
- 🎨 Modern responsive UI with Tailwind CSS
- 🛡️ Protected routes and authentication context
- 📧 Email verification system
- ⚡ Fast development with Vite

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Code Quality**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

### Code Quality

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar
│   └── ProtectedRoute.tsx # Route protection
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Login page
│   ├── Register.tsx     # Registration page
│   └── Verify.tsx       # Email verification page
├── services/            # API services
│   ├── api.ts           # Axios configuration
│   └── auth.service.ts  # Authentication services
├── App.tsx              # User management page
├── main.tsx             # App entry point
└── index.css            # Global styles with Tailwind
```

## API Integration

The app integrates with a backend API running on `http://localhost:3000`. Expected endpoints:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/verify?token=...` - Email verification

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `DELETE /users/:id` - Delete user

## Usage

1. **Registration**: Visit `/register` to create a new account
2. **Email Verification**: Check your email (Mailtrap) for verification link
3. **Login**: Use `/login` to authenticate
4. **Dashboard**: Access `/` for the main dashboard
5. **User Management**: Visit `/users` to manage users (protected route)

## Authentication Flow

1. User registers with name, email, password
2. System sends verification email
3. User clicks verification link to activate account
4. User can now login with email/password
5. JWT token is stored in localStorage
6. Protected routes check authentication status

## Development

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Update routes in `src/main.tsx`
4. Add API calls in `src/services/`

### Styling

The app uses Tailwind CSS for styling. Add custom styles in `src/index.css` or use Tailwind classes directly in components.

### State Management

Authentication state is managed through React Context (`AuthContext`). For more complex state, consider adding Redux or Zustand.

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is licensed under the MIT License.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
