import type { User } from "@prisma/client";

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  username?: string;
  displayName?: string;
  email?: string;
  password?: string;
  emailVerifiedAt?: Date;
}

export type UserEntity = Omit<User, "passwordHash" | "deletedAt">;
