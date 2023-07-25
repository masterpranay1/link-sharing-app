export interface User {
  email : string;
  password : string;
}

export interface UserInfo {
  userid: string;
  firstname?: string;
  lastname?: string;
  profileImage?: string;
  links?: string[];
  email?: string;
}
