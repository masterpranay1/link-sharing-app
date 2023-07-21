import { account } from "../lib/appwrite";
import { v4 as uuidv4 } from "uuid";
import { ICreateUser, IEmailLoginUser } from "../application/ports";
import { notifyError, notifySuccess } from "./notification";

export const useCreateUserService = (): ICreateUser => {
  const createUser = async (email: string, password: string) => {
    try {
      const res = await account.create(uuidv4(), email, password);
      notifySuccess("User created successfully");
      return res.$id;
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return { createUser };
};

export const useEmailLoginUserService = (): IEmailLoginUser => {
  const emailLoginUser = async (email: string, password: string) => {
    try {
      const res = await account.createEmailSession(email, password);
      notifySuccess("Login successful");
      return res.$id;
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return { emailLoginUser };
};
