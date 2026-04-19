import type { CreateUser, UpdateUser, UserEntity } from "#shared/types/entities/user";
import prisma from "~~/prisma";
import { hash } from "argon2";
import type { User } from "@prisma/client";

class UserRepository {
  async createBasic(payload: CreateUser): Promise<UserEntity> {
    const passwordHash = await hash(payload.password);

    return prisma.user.create({
      data: {
        passwordHash,
        email: payload.email,
        username: payload.username,
        displayName: payload.username,
      },
      omit: {
        passwordHash: true,
        deletedAt: true,
      },
    });
  }

  async get(username: string): Promise<UserEntity> {
    return prisma.user.findUniqueOrThrow({
      where: {
        username,
        deletedAt: null,
      },
      omit: {
        passwordHash: true,
        deletedAt: true,
      },
    });
  }

  async getById(id: number): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string, admin: boolean = false): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: {
        email,
        ...(admin ? {} : { deletedAt: null }),
      },
    });
  }

  async update(id: number, payload: Partial<UpdateUser>, admin: boolean = false) {
    return prisma.user.update({
      where: {
        id,
        ...(admin ? {} : { deletedAt: null }),
      },
      data: payload,
      omit: admin
        ? {}
        : {
            passwordHash: true,
            deletedAt: true,
          },
    });
  }

  async deleteAccount(id: number) {
    return prisma.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

const UserModel = new UserRepository();
export default UserModel;
