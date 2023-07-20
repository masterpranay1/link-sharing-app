import { Account, Client } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64b4602b93dd06aa7d86");

export const account = new Account(client);