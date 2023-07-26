import { databases, query } from "@/lib/appwrite";
import { notifyError } from "./notification";

export const useUserPreviewService = () => {
  const getUserPreview = async (userId: string) => {
    const databaseId = "64bf9d8d4b1287ddf27c";
    const userInfoCollectionId = "64bf9d97eb4f5afce89e";
    const linkCollectionId = "64bfa28bc3115acf0235";
    try {
      const userInfo = await databases.listDocuments(
        databaseId,
        userInfoCollectionId,
        [query.equal("userid", userId)]
      );
      if (userInfo.documents.length > 0) {
        const links = await Promise.all(
          userInfo.documents[0].links.map(async (linkId: string) => {
            const link = await databases.listDocuments(
              databaseId,
              linkCollectionId,
              [
                query.equal("$id", linkId)
              ]
            );
            return {
              id: link.documents[0].$id,
              platform: link.documents[0].platform,
              url: link.documents[0].url,
            };
          })
        );


        return {
          id: userInfo.documents[0].$id,
          firstName: userInfo.documents[0].firstname,
          lastName: userInfo.documents[0].lastname,
          profileImage: userInfo.documents[0].profileImage,
          links
        }
      } else {
        return null;
      }
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return {
    getUserPreview,
  }
};
