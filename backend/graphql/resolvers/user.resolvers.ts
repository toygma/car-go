import { Response } from "express";
import {
  forgotPassword,
  login,
  registerUser,
  updateAvatar,
  updatePassword,
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
    forgotPassword: async (_: any, { email }: { email: string }) => {
      return forgotPassword(email);
    },
  },
};
