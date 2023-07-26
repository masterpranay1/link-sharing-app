import { databases, query } from "@/lib/appwrite";
import { v4 as uuidv4 } from "uuid";
import { useGlobal } from "./context";
import { ISaveLink, IGetLinks } from "@/application/ports";
import { notifyError } from "./notification";

export function useSaveLinkService(): ISaveLink {
  const { userState } = useGlobal();
  const saveLink = async (
    id: string,
    url: string,
    platform: string,
    isOther: boolean
  ) => {
    const databaseId = "64bf9d8d4b1287ddf27c";
    const linkCollectionId = "64bfa28bc3115acf0235";
    const userInfoCollectionId = "64bf9d97eb4f5afce89e";
    try {
      const res = await databases.listDocuments(databaseId, linkCollectionId, [
        query.equal("$id", id),
      ]);

      if (res.documents.length > 0) {
        await databases.updateDocument(databaseId, linkCollectionId, id, {
          url,
          platform,
          isOther,
        });

        return id;
      } else {
        const res = await databases.createDocument(
          databaseId,
          linkCollectionId,
          uuidv4(),
          {
            url,
            platform,
            isOther,
          }
        );

        const userInfo = await databases.listDocuments(
          databaseId,
          userInfoCollectionId,
          [query.equal("userid", userState.id)]
        );

        if (userInfo.documents.length > 0) {
          await databases.updateDocument(
            databaseId,
            userInfoCollectionId,
            userInfo.documents[0].$id,
            {
              links: [...userInfo.documents[0].links, res.$id],
            }
          );
        } else {
          await databases.createDocument(
            databaseId,
            userInfoCollectionId,
            uuidv4(),
            {
              userid: userState.id,
              links: [res.$id],
            }
          );
        }

        return res.$id;
      }
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return {
    saveLink,
  };
}

export function useGetLinkService(): IGetLinks {
  const { userState } = useGlobal();

  const getLinks = async () => {
    const databaseId = "64bf9d8d4b1287ddf27c";
    const userInfoCollectionId = "64bf9d97eb4f5afce89e";
    const linkCollectionId = "64bfa28bc3115acf0235";

    try {
      const userInfo = await databases.listDocuments(
        databaseId,
        userInfoCollectionId,
        [query.equal("userid", userState.id)]
      );

      if (userInfo.documents.length > 0) {
        const links = await Promise.all(
          userInfo.documents[0].links.map(async (linkId: string) => {
            const link = await databases.listDocuments(
              databaseId,
              linkCollectionId,
              [query.equal("$id", linkId)]
            );
            return {
              id: link.documents[0].$id,
              url: link.documents[0].url,
              platform: link.documents[0].platform,
              isOther: link.documents[0].isOther,
            };
          })
        );

        return links;
      } else {
        return [];
      }
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return {
    getLinks,
  };
}
