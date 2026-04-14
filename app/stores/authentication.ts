import { type AuthenticationState, defaults } from "~/types/states/authentication";

export const useAuthStore = defineStore("auth", {
  state: (): AuthenticationState => ({ ...defaults }),
  getters: {},
  actions: {
    async recoverUser() {},

    async login(payload: { email: string; password: string }) {
      console.log(payload);
      return false;
    },
    async register(payload: { username: string; email: string; password: string }) {
      console.log(payload);
      return false;
    },
  },
});
