export interface ICreateUser {
  createUser : (email : string, password: string) => void
}

export interface IEmailLoginUser {
  emailLoginUser : (email : string, password : string) => void
}