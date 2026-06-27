import {
  AppError,
  NotFoundError,
  ValidationError,
} from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import User from "./user.model.js";
import { generateToken } from "../../configs/auth.js";

const saltRounds = 10;

export const authenticateCredentials = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new NotFoundError("User not found");

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) throw new ValidationError("Wrong Password");

  const userResponse = user.toJSON();
  delete userResponse.passwordHash;

  const token = generateToken(user.id);

  return { user: userResponse, token };
};

export const registerNewUser = async (newUserData) => {
  const { firstName, lastName, username, email, password } = newUserData;

  const isEmailTaken = await User.findOne({ where: { email } });

  if (isEmailTaken) throw new AppError("Email already taken");

  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    passwordHash,
  });

  const newUserResponse = newUser.toJSON();
  delete newUserResponse.passwordHash;

  const token = generateToken(newUser.id);

  return { newUser: newUserResponse, token };
};
