const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the details",
      });
    }

    // Existing User
    const previousUser = await userModel.findOne({ email });
    if (previousUser) {
      return res.status(200).send({
        success: false,
        message: "User already present",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "New user created",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Message in register callback",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the details",
      });
    }

    // Existing User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not present",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid creditianls",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User login successfuly",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Message in register callback",
      error,
    });
  }
};
