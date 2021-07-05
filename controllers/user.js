import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, displayName, walletAddress } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({
        message: "This email is already registered",
      });

    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "password must be atleast 8 characters" });

    // if (password !== confirmPassword)
    //   return res.status(400).json({ message: "password doesn't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      walletAddress,
      displayName,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { displayName, bio, selectedFile } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Unauthenticated user ${id}`);

    const updatedProfile = {
      displayName,
      bio,
      selectedFile,
    };

    const newUpdatedProfile = await UserModal.findByIdAndUpdate(
      id,
      updatedProfile,
      { new: true }
    );

    res.json({ result: newUpdatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
