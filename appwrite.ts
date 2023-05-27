import { Client, Account, Databases, Storage, ID } from "appwrite"
const client = new Client()

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
const account = new Account(client)
const databeses = new Databases(client)
const storage = new Storage(client)

export { client, account, databeses, storage, ID }
