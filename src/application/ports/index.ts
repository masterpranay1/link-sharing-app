export interface ICreateUser {
  createUser : (email : string, password: string) => Promise<string | null>
}

export interface IEmailLoginUser {
  emailLoginUser : (email : string, password : string) => Promise<string | null>
}