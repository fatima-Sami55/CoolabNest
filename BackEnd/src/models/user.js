import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: String,
  school: String,
  experience: String,
  userName: String,
  isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
export default User;