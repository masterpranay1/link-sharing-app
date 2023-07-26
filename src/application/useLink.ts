import { useSaveLinkService, useGetLinkService, useDeleteLinkService } from "@/services/linkAdapter";
import { ISaveLink, IGetLinks, IDeleteLink } from "./ports";
import { ILink } from "@/domain/link";

export const useSaveLink = () => {
  const { saveLink } : ISaveLink = useSaveLinkService();

  async function saveLinkHandler(id:string, url: string, platform: string, isOther: boolean) {
    return await saveLink(id, url, platform, isOther);
  }

  return { saveLinkHandler };
}

export const useGetLinks = () => {
  const { getLinks } : IGetLinks = useGetLinkService();

  async function getLinksHandler() {
    const userInfo: ILink[] | null = await getLinks();
    return userInfo;
  }

  return { getLinksHandler };
}

export const useDeleteLink = () => {
  const { deleteLink } : IDeleteLink = useDeleteLinkService();

  async function deleteLinkHandler(id: string) {
    const isDeleted: boolean = await deleteLink(id);
    return isDeleted;
  }

  return { deleteLinkHandler };
}
