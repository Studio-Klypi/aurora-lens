import { type AuthenticationState, defaults } from "~/types/states/authentication";
import type { CreateUser, UserEntity } from "#shared/types/entities/user";
import { ErrorCode } from "#shared/types/generic/errors";

export const useAuthStore = defineStore("auth", {
  state: (): AuthenticationState => ({ ...defaults }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,

    isLoggedIn: state => !!state.user,
  },
  actions: {
    async recoverUser() {
      try {
        const { data } = await useFetch<UserEntity>("/api/users/me");

        if (!data.value) return;
        this.user = data.value;
      }
      catch (e) {
        console.error(e);
      }
    },

    async login(payload: { email: string; password: string }) {
      this.loading.login = true;
      let state = true;

      try {
        const response = await $fetch<UserEntity>("/api/auth/login", {
          method: "POST",
          body: {
            ...payload,
          },
        });

        this.user = response;
        console.log(response);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (e: any) {
        const { data } = e.data;

        switch (data.errorCode) {
          case ErrorCode.INVALID_CREDENTIALS: {
            console.log("Invalid credentials");
            break;
          }
        }
        state = false;
      }
      finally {
        this.loading.login = false;
      }

      return state;
    },
    async register(payload: CreateUser) {
      this.loading.register = true;
      let state = true;

      try {
        const response = await $fetch<UserEntity>("/api/auth/register", {
          method: "POST",
          body: {
            ...payload,
          },
        });

        this.user = response;
        console.log(response);
      }
      catch (e) {
        console.error(e);
        state = false;
      }
      finally {
        this.loading.register = false;
      }

      return state;
    },

    async verifyEmail(token: string) {
      if (!this.user) return false;

      this.loading.verify = true;
      let state = true;

      try {
        const response = await $fetch<UserEntity>("/api/auth/verify", {
          method: "POST",
          body: {
            token,
          },
        });

        this.user = response;
        console.log(response);
      }
      catch (e) {
        console.error(e);
        state = false;
      }
      finally {
        this.loading.verify = false;
      }

      return state;
    },
    async requestNewCode() {
      try {
        await $fetch("/api/auth/request-new-verification-code", {
          method: "POST",
        });
      }
      catch (e) {
        console.error(e);
      }
    },

    async forgotPassword(email: string) {
      this.loading.forgot = true;
      let state = true;

      try {
        await $fetch("/api/auth/password/forgot", {
          method: "POST",
          body: {
            email,
          },
        });
      }
      catch {
        state = false;
      }
      finally {
        this.loading.forgot = false;
      }

      return state;
    },
    async resetPassword(token: string, password: string) {
      this.loading.reset = true;
      let state = true;

      try {
        await $fetch("/api/auth/password/reset", {
          method: "POST",
          body: {
            token,
            password,
          },
        });
      }
      catch {
        state = false;
      }
      finally {
        this.loading.reset = false;
      }

      return state;
    },

    async logout() {
      if (!this.user) return;

      console.log("logout");
      this.user = null;
    },
  },
});
