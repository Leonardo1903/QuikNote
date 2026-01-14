import { Client, Account, TablesDB, Storage } from "appwrite";

export const API_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const NOTES_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_NOTES_COLLECTION_ID;
export const NOTEBOOKS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_NOTEBOOKS_COLLECTION_ID;
export const STORAGE_BUCKET_ID =
  import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || "profile-images";

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const database = new TablesDB(client);
export const storage = new Storage(client);

export default client;
