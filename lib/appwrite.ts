
import {Account, Avatars, Client, Databases, ID, Query,Storage} from "react-native-appwrite"
import {CreateUserParams, GetMenuParams, SignInParams, User} from "@/type";




export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.techx.foodordering",
    databaseId:'695df120001203344365',
    bucketId:'6965cddd002be8ebe43d',
    userCollectionId:'user',
    categoriesCollectionId:'categories',
    menuCollectionId:'menu',
    customizationCollectionId:'customization',
    menuCustomizationCollectionId:'menu_customizations_',
}

export const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)   // Appwrite URL
    .setProject(appwriteConfig.projectId)   // Project ID
    .setPlatform(appwriteConfig.platform);  // Platform (Expo / Android / iOS)

export const account = new Account(client)
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({email,password,name}:CreateUserParams) => {

    try {
      const newAccount =  await account.create(ID.unique(),email,password,name)
        if (!newAccount) throw Error;
        await  signIn({email,password});
        const avatarUrl = avatars.getInitialsURL(name);
        return await  databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {email,name,accountId:newAccount.$id,avatar:avatarUrl}
        );

    }catch (e) {
        throw new Error(e as string)
    }

}

export const signIn = async ({email,password}:SignInParams) => {

    try {
        const session = await account.createEmailPasswordSession(email,password);

    }catch (e){
        throw new Error(e as string)
    }

}

export  const getCurrentUser = async () => {
    try {
    const currentAccount  = await  account.get();
    if (!currentAccount) throw Error;
    const currentUser =  await databases.listDocuments<User>(appwriteConfig.databaseId,appwriteConfig.userCollectionId,[Query.equal('accountId',currentAccount.$id)]);
    if (!currentUser) throw Error;
    return currentUser.documents[0];

    }catch (e) {
        throw new Error(e as string)
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}