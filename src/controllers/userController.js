import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';


export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const updates = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
    };

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};



export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createHttpError(400, "No file"));
    }


    const result = await saveFileToCloudinary(req.file.buffer);


    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: result.secure_url },
      { new: true }
    ).select("-password");


    res.status(200).json({
      message: "Avatar updated successfully",
      avatar: user.avatar,
      url: user.avatar,
      user,
    });
  } catch (error) {
    next(error);
  }
};
