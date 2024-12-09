import SignIn from '@/app/(auth)/sign-in';
import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://clowd.appwrite.io/v1',
  platform: 'com.akira.air',
  projectId: '6757092b001311371d25',
  databseId: '67570ae2001ff9949c35',
  userCollectionId: '67570b090020acf86484',
  videoCollectionId: '67570b3100277749b55a',
  storageId: '67570cfe000d21f783e5',
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) {
      throw Error;
    }

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databseId,
      config.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl },
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};