import {defineStore} from 'pinia'
import {ref, watch} from "vue";
import type { User } from '@/dto/user/User'
import type { UserTokenPair } from '@/dto/user/UserTokenPair'


const USER_LS_KEY = "user_store"

/**
 * Stores user data
 */
export const useUserStore = defineStore('user', () => {
  const user = ref(null as User | null)

  const userOnLocalStorage = localStorage.getItem(USER_LS_KEY);

  if (userOnLocalStorage) {
    user.value = JSON.parse(userOnLocalStorage)
  }

  // Watch and synchronize user with local storage
  watch(() => user, (state) => {
    localStorage.setItem(USER_LS_KEY, JSON.stringify(state.value))
  }, {deep: true})

  /**
   * Updates the whole user object
   * @param newUser New user object
   */
  const updateUser = (newUser: User) => {
    user.value = newUser;
  }

  /**
   * Updates token pair for the existing user
   * @param newPair New token pair
   */
  const updateUserTokenPair = (newPair: UserTokenPair) => {
    user.value!.tokenPair = newPair
  }

  /**
   * Removes all data of the user
   */
  const clearUser = () => {
    user.value = null
  }

  /**
   * Returns true if there is data for the user
   */
  const hasUser = () => {
    return user.value !== null
  }

  return {
    user,
    updateUser,
    updateUserTokenPair,
    clearUser,
    hasUser
  }
})
