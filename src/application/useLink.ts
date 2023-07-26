import { useSaveLinkService, useGetLinkService } from "@/services/linkAdapter";
import { ISaveLink, IGetLinks } from "./ports";
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