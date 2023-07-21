import  { account } from "../lib/appwrite";
import { v4 as uuidv4 } from 'uuid';
import { ICreateUser, IEmailLoginUser } from "../application/ports";

export const useCreateUserService = () : ICreateUser => {
  const createUser = async (email: string, password: string) => {
    try {
      const res = await account.create(uuidv4(),email, password);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  return { createUser };
}

export const useEmailLoginUserService = () : IEmailLoginUser => {
  const emailLoginUser = async (email: string, password: string) => {
    try {
      const res = await account.createEmailSession(email, password)
      console.log(res)
    } catch(error) {
      console.log(error)
    }
  }

  return { emailLoginUser }
}
