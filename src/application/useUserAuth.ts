import { ICreateUser, IEmailLoginUser } from "./ports";
import { User } from "../domain/user";
import {
  useCreateUserService,
  useEmailLoginUserService,
} from "../services/userAdapter";

export function useCreateUser() {
  const createUserService: ICreateUser = useCreateUserService();

  async function createUser(user: User) {
    return createUserService.createUser(user.email, user.password);
  }

  return createUser
}

export function useEmailLoginUser() {
  const emailLoginUserService : IEmailLoginUser = useEmailLoginUserService()

  async function emailLoginUser(user : User) {
    return emailLoginUserService.emailLoginUser(user.email, user.password)
  }

  return emailLoginUser
}
