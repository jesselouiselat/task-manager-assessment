import { authenticateCredentials, registerNewUser } from "./user.service.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authenticateCredentials(email, password);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const { newUser, token } = await registerNewUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: `${username} is successfullt registered`,
      user: newUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};
