export interface AuthenticationState {
  user: unknown | null;
  loading: {
    login: boolean;
    register: boolean;
  };
}

export const defaults: AuthenticationState = {
  user: null,
  loading: {
    login: false,
    register: false,
  },
};
