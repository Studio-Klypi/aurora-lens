import prisma from "~~/prisma";
import { v4 as uuid } from "uuid";
import type { Session, User } from "@prisma/client";

class SessionRepository {
  private validity = 7_200_000 as const;

  async create(userId: number): Promise<Session> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.validity);

    return prisma.session.create({
      data: {
        token: uuid(),
        userId,
        expiresAt,
        createdAt: now,
      },
    });
  }

  async verify(token: string): Promise<User> {
    return prisma.session.findUniqueOrThrow({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
    }).user();
  }

  async revoke(token: string) {
    const now = new Date();

    return prisma.session.update({
      where: {
        token,
        expiresAt: {
          gt: now,
        },
        revokedAt: null,
      },
      data: {
        revokedAt: now,
      },
    });
  }

  async revokeAll(userId: number) {
    const now = new Date();

    return prisma.session.updateMany({
      where: {
        userId,
        expiresAt: {
          gt: now,
        },
        revokedAt: null,
      },
      data: {
        revokedAt: now,
      },
    });
  }

  async prune() {
    return prisma.session.deleteMany({
      where: {
        OR: [
          {
            expiresAt: {
              lte: new Date(),
            },
          },
          {
            revokedAt: {
              not: null,
            },
          },
        ],
      },
    });
  }
}

const SessionModel = new SessionRepository();
export default SessionModel;
