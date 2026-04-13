export interface Version {
  version: string;
  major: number;
  minor: number;
  patch: number;
  prerelease?: "alpha" | "beta" | "rc";
}
