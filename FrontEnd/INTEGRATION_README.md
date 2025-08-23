# CollabNest Frontend-Backend Integration

## Overview
This integration connects the React frontend with the Express.js backend for authentication functionality.

## Backend API Endpoints

### Authentication Routes
- `POST /login` - User login
- `POST /signup` - User registration (with file upload support)
- `POST /logout` - User logout
- `GET /signup/verify-email` - Email verification

## Frontend Integration Changes

### 1. API Utility (`src/utils/api.js`)
- Centralized API request handling
- Automatic token management
- Error handling
- Support for FormData (file uploads)

### 2. AuthContext Updates (`src/contexts/AuthContext.jsx`)
- Real API integration instead of mock data
- Proper token and user data storage
- Error handling and propagation
- FormData creation for registration

### 3. Register Component Updates (`src/pages/auth/Register.jsx`)
- Added profile picture upload functionality
- Added experience level field
- Field mapping: frontend `name` → backend `userName`
- File validation (type and size)
- Better error handling

### 4. Login Component Updates (`src/pages/auth/Login.jsx`)
- Improved error message handling
- Better integration with AuthContext

## Field Mapping

### Registration Fields
| Frontend Field | Backend Field | Type | Required |
|----------------|---------------|------|----------|
| name | userName | string | Yes |
| email | email | string | Yes |
| password | password | string | Yes |
| school | school | string | Yes |
| experience | experience | string | Yes |
| profilePicture | profilePicture | file | No |

### Response Fields
| Backend Field | Frontend Usage |
|---------------|----------------|
| id | user.id |
| email | user.email |
| userName | user.userName |
| profilePicture | user.profilePicture |
| school | user.school |
| experience | user.experience |

## Setup Instructions

### Backend Setup
1. Navigate to BackEnd directory:
   ```bash
   cd BackEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required variables:
   ```env
   PORT=3000
   JWT_SECRET=your-jwt-secret-here
   JWT_EXPIRES_IN=7d
   MONGODB_URI=your-mongodb-connection-string
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   REDIS_URL=your-redis-connection-string
   BREVO_API_KEY=your-brevo-api-key
   REDIRECT_URL=http://localhost:5173/login
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The `.env` file is already configured with:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   REACT_APP_ENV=development
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Testing the Integration

### 1. Backend Health Check
Visit `http://localhost:3000/home` to verify the backend is running.

### 2. Registration Flow
1. Go to `http://localhost:5173/register`
2. Fill in all required fields
3. Optionally upload a profile picture
4. Submit the form
5. Check your email for verification link
6. Verify email by clicking the link

### 3. Login Flow
1. Go to `http://localhost:5173/login`
2. Enter email and password
3. Submit the form
4. Should redirect to dashboard on success

### 4. API Test Component
Use the APITest component at `/src/components/APITest.jsx` to test individual API endpoints.

## Error Handling

### Common Issues and Solutions

1. **CORS Errors**
   - Ensure backend CORS is configured for frontend URL
   - Check that frontend is running on port 5173 (Vite default)

2. **File Upload Errors**
   - Max file size: 5MB (frontend) / 2MB (backend)
   - Allowed types: PNG, JPG, JPEG
   - Check Cloudinary configuration

3. **Database Connection**
   - Verify MongoDB connection string
   - Ensure database is accessible

4. **Redis Connection**
   - Verify Redis is running
   - Check Redis connection string

5. **Email Verification**
   - Check Brevo API configuration
   - Verify email service is working

## Security Features

1. **JWT Token Management**
   - Tokens stored in Redis with expiration
   - Automatic token cleanup on logout
   - Bearer token authentication

2. **Password Security**
   - BCrypt hashing
   - Minimum 6 character requirement

3. **File Upload Security**
   - File type validation
   - File size limits
   - Secure cloud storage (Cloudinary)

4. **Rate Limiting**
   - Signup endpoint protected with rate limiting
   - Prevents spam registrations

## API Response Format

### Success Response
```json
{
  "message": "Success message",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "userName": "User Name",
    "profilePicture": "cloudinary-url",
    "school": "University Name",
    "experience": "Intermediate"
  }
}
```

### Error Response
```json
{
  "message": "Error message"
}
```

## Next Steps

1. Implement password reset functionality
2. Add user profile management
3. Implement refresh token mechanism
4. Add social login options
5. Enhance error handling and user feedback
