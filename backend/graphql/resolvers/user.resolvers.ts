import { Response } from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  login,
  registerUser,
  updateAvatar,
  updatePassword,
  updateUser,
  updateUserProfile,
} from "../../controllers/user.controllers";
import { UserInput } from "../../types/user.types";
import { IUser } from "shared";

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: { user: IUser }) => {
      return user;
    },
    logout: async (_: any, __: any, { res }: { res: Response }) => {
      res.cookie("token", "", {
        maxAge: 0,
      });
      return true;
    },
    getAllUsers: async (
      _: any,
      { page, query }: { page: string; query: string }
    ) => getAllUsers(page, query),
  },
  Mutation: {
    registerUser: async (_: any, { userInput }: { userInput: UserInput }) => {
      return registerUser(userInput);
    },

    login: async (
      _: any,
      { email, password }: { email: string; password: string },
      { res }: { res: Response }
    ) => {
      return login(email, password, res);
    },
    updateUserProfile: async (
      _: any,
      { userInput }: { userInput: Partial<UserInput> },
      { user }: { user: IUser }
    ) => {
      return updateUserProfile(userInput, user.id);
    },
    updatePassword: async (
      _: any,
      {
        oldPassword,
        newPassword,
      }: { oldPassword: string; newPassword: string },
      { user }: { user: IUser }
    ) => {
      return updatePassword(oldPassword, newPassword, user.id);
    },
    updateAvatar: async (
      _: any,
      { avatar }: { avatar: string },
      { user }: { user: IUser }
    ) => {
      return updateAvatar(avatar, user.id);
    },
    updateUser: async (
      _: any,
      { userId, userInput }: { userId: string; userInput: Partial<UserInput> }
    ) => {
      return updateUser(userInput, userId);
    },
    forgotPassword: async (_: any, { email }: { email: string }) => {
      return forgotPassword(email);
    },
    deleteUser: async (_: any, { userId }: { userId: string }) => {
      return deleteUser(userId);
    },
  },
};
