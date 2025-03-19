import { Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import { UserInput } from "../types/user.types";
import * as bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import {
  deleteCloudinary,
  uploadImagesToCloudinary,
} from "../utils/cloudinary";
import { resetPasswordTemplate } from "../utils/emailTemplate";
import sendEmail from "../utils/sendEmail";
import APIFilters from "../utils/apiFilters";

export const registerUser = catchAsyncErrors(async (userInput: UserInput) => {
  const { email, name, password, phoneNo } = userInput;

  if (!email || !name || !password || !phoneNo) {
    throw new Error("Fields cannot be left blank");
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email is being used");
  }

  return await User.create({
    name,
    email,
    password,
    phoneNo,
  });
});

export const login = catchAsyncErrors(
  async (email: string, password: string, res: Response) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { _id: user?._id },
      process.env.JWT_SECRET as Secret | any,
      {
        expiresIn: process.env.JWT_EXPIRESTIME as any,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
    });

    return user;
  }
);

export const updateUserProfile = catchAsyncErrors(
  async (userData: Partial<UserInput>, userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const userEmail = await User.findOne({ email: userData.email });

    if (userEmail) {
      throw new Error("Email is being used");
    }

    user?.set(userData);
    await user.save();

    return true;
  }
);

export const updatePassword = catchAsyncErrors(
  async (oldPassword: string, newPassword: string, userId: string) => {
    const user = await User.findById(userId).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    const comparePassword = bcrypt.compare(oldPassword, user?.password);

    if (!comparePassword) {
      throw new Error("Password is not matching");
    }

    user.password = newPassword;
    await user.save();
    return true;
  }
);

export const updateAvatar = catchAsyncErrors(
  async (avatar: string, userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const avatarResponse = await uploadImagesToCloudinary(
      avatar,
      "gorental/avatars"
    );

    if (!avatarResponse) {
      throw new Error("Avatar response error");
    }

    if (user?.avatar?.public_id) {
      await deleteCloudinary(user?.avatar?.public_id);
    }

    await User.findByIdAndUpdate(
      userId,
      {
        avatar: avatarResponse,
      },
      { new: true }
    );
    return true;
  }
);

export const forgotPassword = catchAsyncErrors(async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }
  const resetToken = user.getResetPasswordToken();

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = resetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user?.email,
      subject: "Go Rental Password Recovery",
      message,
    });
  } catch (error: any) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    throw new Error(error?.message);
  }
});

export const getAllUsers = catchAsyncErrors(
  async (page: number, query: string) => {
    const resPerPage = 3;
    const searchQuery = new APIFilters(User).search(query);

    let users = await searchQuery.model;

    const totalCount = users.length;

    searchQuery.pagination(page, resPerPage);

    users = await searchQuery.model.clone();

    return { users, pagination: { totalCount, resPerPage } };
  }
);

export const updateUser = catchAsyncErrors(
  async (userData: Partial<UserInput>, userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user?.set(userData).save();

    return true;
  }
);

export const deleteUser = catchAsyncErrors(
  async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user?.avatar?.public_id) {
      await deleteCloudinary(user?.avatar?.public_id);
    }

    await user.deleteOne();

    return true;
  }
);
