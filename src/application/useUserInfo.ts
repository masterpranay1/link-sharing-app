import { IGetUserInfo } from "./ports";
import { useGetUserInfoService, useSaveUserInfoService } from "@/services/userInfoAdapter";
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
