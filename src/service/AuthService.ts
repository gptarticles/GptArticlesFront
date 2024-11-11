import type { UserRegisterData } from '@/dto/user/UserRegisterData'
import type { User } from '@/dto/user/User'
import { useUserStore } from '@/stores/UserStore'

export class AuthService {
  private static readonly instance = new AuthService();

  private readonly userStorage = useUserStore();

  public static getInstance() : AuthService {
    return this.instance;
  }

  public async login(username: string, password: string) : Promise<void> {
    // TODO replace to real endpoint
    if (username != "admin" || password != "admin") {
      throw "Login and password are incorrect";
    }

    const user : User = {
      id: 1,
      name: "admin",
      tokenPair: {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      }
    }

    this.userStorage.updateUser(user);
  }

  public async register(registerDto: UserRegisterData) : Promise<void> {
    // TODO here just POST request
  }
}
