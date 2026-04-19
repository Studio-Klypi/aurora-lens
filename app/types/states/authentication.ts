import type { UserEntity } from "#shared/types/entities/user";

export interface AuthenticationState {
  user: UserEntity | null;
  loading: {
    login: boolean;
    register: boolean;
    verify: boolean;
    forgot: boolean;
    reset: boolean;
  };
}

export const defaults: AuthenticationState = {
  user: null,
  loading: {
    login: false,
    register: false,
    verify: false,
    forgot: false,
    reset: false,
  },
};
