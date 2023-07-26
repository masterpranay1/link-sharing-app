import { IGetUserInfo, ISaveUserInfo, ISaveProfilePicture } from "@/application/ports";
import { databases, query, account, storage } from "@/lib/appwrite";
import { useGlobal } from "./context";
import { notifyError } from "./notification";
import { v4 as uuidv4 } from "uuid";

export const useGetUserInfoService = (): IGetUserInfo => {
  const { userState } = useGlobal();

  const getUserInfo = async () => {
    try {
      const res = await databases.listDocuments(
        "64bf9d8d4b1287ddf27c",
        "64bf9d97eb4f5afce89e",
        [query.equal("userid", userState.id)]
      );

      const accountRes = await account.get();

      if (res.documents.length > 0) {
        return {
          userid: res.documents[0].userid,
          firstname: res.documents[0].firstname,
          lastname: res.documents[0].lastname,
          profileImage: res.documents[0].profileImage,
          links: res.documents[0].links,
          email: accountRes.email,
        };
      } else {
        return {
          userid: userState.id,
          firstname: "",
          lastname: "",
          profileImage: "",
          links: [],
          email: accountRes.email,
        };
      }
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return { getUserInfo };
};

export const useSaveUserInfoService = (): ISaveUserInfo => {
  const { userState } = useGlobal();

  const saveUserInfo = async (userInfo: any) => {
    try {
      const res = await databases.listDocuments(
        "64bf9d8d4b1287ddf27c",
        "64bf9d97eb4f5afce89e",
        [query.equal("userid", userState.id)]
      );
      if (res.documents.length > 0) {
        await databases.updateDocument(
          "64bf9d8d4b1287ddf27c",
          "64bf9d97eb4f5afce89e",
          res.documents[0].$id,
          {
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
          }
        );
      } else {
        await databases.createDocument(
          "64bf9d8d4b1287ddf27c",
          "64bf9d97eb4f5afce89e",
          uuidv4(),
          {
            userid: userState.id,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
          }
        );
      }

      return true;
    } catch (error: any) {
      notifyError(error.message);
      return false;
    }
  };

  return { saveUserInfo };
};

export const useSaveProfilePictureService = () : ISaveProfilePicture => {
  const { userState } = useGlobal();

  const saveProfilePicture = async (file: any) => {
    try {
      const res = await databases.listDocuments(
        "64bf9d8d4b1287ddf27c",
        "64bf9d97eb4f5afce89e",
        [query.equal("userid", userState.id)]
      );
      if (res.documents[0].profileImageId) {
        await storage.deleteFile(
          "64b91adf49de69863ebd",
          res.documents[0].profileImageId
        );
      }

      const res2 = await storage.createFile(
        "64b91adf49de69863ebd",
        uuidv4(),
        file
      );

      const res3 = await storage.getFileView("64b91adf49de69863ebd", res2.$id);

      await databases.updateDocument(
        "64bf9d8d4b1287ddf27c",
        "64bf9d97eb4f5afce89e",
        res.documents[0].$id,
        {
          profileImage: res3.href,
          profileImageId: res2.$id,
        }
      );

      return res3.href;
    } catch (error: any) {
      notifyError(error.message);
      return null;
    }
  };

  return { saveProfilePicture };
};
