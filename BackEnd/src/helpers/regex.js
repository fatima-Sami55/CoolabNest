const linkedin = /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
const github = /^https?:\/\/(www\.)?github\.com\/(?!-)[A-Za-z0-9-]{1,39}(?<!-)\/?$/;
const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const profilePicture = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;

export const regex = {
  linkedin: new RegExp(linkedin),
  github: new RegExp(github),
  email: new RegExp(email),
  password: new RegExp(password),
  profilePicture: new RegExp(profilePicture)
};