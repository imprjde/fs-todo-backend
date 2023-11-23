const fs = require("fs");
const bcrypt = require("bcrypt");
const model = require("../model/User");
const imgModel = require("../model/ProfileImage");
const User = model.User;
const ProfileImage = imgModel.ProfileImage;

exports.signupUser = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const checkUsername = await User.findOne({ username: req.body.username });
    if (checkUsername) {
      return res.status(401).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const { name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, username, email, password: hashedPassword });
    const savedUser = await user.save();
    const userResponse = {
      id: savedUser.id,
      name: savedUser.name,
      username: savedUser.username,
      email: savedUser.email,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: "Signup Failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validatePassword) {
        const userWithTodos = await User.findById(user._id);
        const profileImage = await ProfileImage.find({ userId: user._id });

        const userData = {
          id: userWithTodos._id,
          name: userWithTodos.name,
          username: userWithTodos.username,
          email: userWithTodos.email,
          userTodos: userWithTodos.userTodos,
          profileImage: profileImage,
        };

        res.status(200).json(userData);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    let updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
