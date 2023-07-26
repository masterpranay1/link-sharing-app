import { IGetUserInfo, ISaveProfilePicture } from "./ports";
import { useGetUserInfoService, useSaveUserInfoService, useSaveProfilePictureService } from "@/services/userInfoAdapter";
import { UserInfo } from "@/domain/user";

export function useGetUserInfo(){
  const getUserInfoService : IGetUserInfo = useGetUserInfoService()

  async function getUserInfo() {
    return getUserInfoService.getUserInfo()
  }

  return getUserInfo
}

export function useSaveUserInfo() {
  const saveUserInfoService = useSaveUserInfoService()

  async function saveUserInfo(userInfo: UserInfo) {
    return saveUserInfoService.saveUserInfo(userInfo)
  }

  return saveUserInfo
}

export function useSaveProfilePicture() {
  const saveProfilePictureService : ISaveProfilePicture = useSaveProfilePictureService()

  async function saveProfilePicture(picture: File) {
    return saveProfilePictureService.saveProfilePicture(picture)
  }

  return saveProfilePicture
}
