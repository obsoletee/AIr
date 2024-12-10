import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://clowd.appwrite.io/v1',
  platform: 'com.akira.air',
  projectId: '6757092b001311371d25',
  databaseId: '67570ae2001ff9949c35',
  userCollectionId: '67570b090020acf86484',
  videoCollectionId: '67570b3100277749b55a',
  storageId: '67570cfe000d21f783e5',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;
const client = new Client();

client.setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    avatar: string;
    username: string;
  };
  createdAt: string;
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const createUser = async (
  email: string,
  password: string,
  username: string,
) => {
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
      databaseId,
      userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl },
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async (): Promise<any> => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error('Current account not found');
    }

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      videoCollectionId,
    );

    const posts: Post[] = response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title,
      thumbnail: doc.thumbnail,
      video: doc.video,
      creator: {
        avatar: doc.users.avatar,
        username: doc.users.username,
      },
      createdAt: doc.$createdAt,
    }));

    return posts;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch posts');
  }
};

const query = [Query.orderDesc('$createdAt'), Query.limit(7)];

export const getLatestPosts = async () => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      query,
    );
    const posts: Post[] = response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title,
      thumbnail: doc.thumbnail,
      video: doc.video,
      creator: {
        avatar: doc.users.avatar,
        username: doc.users.username,
      },
      createdAt: doc.$createdAt,
    }));

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};
