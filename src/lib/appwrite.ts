// @ts-ignore
import { Account, Client, Databases, Query, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64b4602b93dd06aa7d86");

export const account = new Account(client);
export const databases = new Databases(client);
export const query = Query
export const storage = new Storage(client)
