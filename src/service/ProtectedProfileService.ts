import type { UserProfileInfo } from '@/dto/user/UserProfileInfo'
import { useUserStore } from '@/stores/UserStore'

export class ProtectedProfileService {
  private static readonly instance = new ProtectedProfileService();

  private readonly userStorage = useUserStore();

  public static getInstance() : ProtectedProfileService {
    return this.instance;
  }


  public async getProfileInfo() : Promise<UserProfileInfo> {
    const tokenData = {
      nickname: this.userStorage.user!.name
    }

    const serverData : Omit<UserProfileInfo, 'nickname'> = {
      email: 'serzh.kazantseff@gmail.com'
    }

    return {...serverData, ...tokenData}
  }

  public async changeNickname(newValue: string, currentPassword: string) : Promise<void> {
    // TODO
  }

  public async changePassword(newValue: string, currentPassword: string) : Promise<void> {
    // TODO
    if (newValue != currentPassword) {
      throw "Passwords are not the same"
    }
  }
}
