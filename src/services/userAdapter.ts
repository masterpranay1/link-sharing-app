import  { account } from "../lib/appwrite";

export const useCreateUser = () => {
  const createUser = async (email: string, password: string) => {
    try {
      await account.create('ID.unique()',email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return { createUser };
}