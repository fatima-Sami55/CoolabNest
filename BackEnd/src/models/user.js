import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: null },
  school: { type: String, default: null },
  experience: { type: String, default: null },
  userName: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  joinedDate: { type: Date, default: null },
  country: { type: String, default: null },
  bio: { type: String, default: null },
  skills: { type: String, default: null },
  github: { type: String, default: null },
  linkedin: { type: String, default: null }
});

const User = mongoose.model('User', userSchema);
export default User;