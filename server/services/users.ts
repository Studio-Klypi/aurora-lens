import type { Prisma } from "@prisma/client";
import { ErrorCode } from "#shared/types/generic/errors";
import UserModel from "#server/repositories/user";
import { HttpCode, type HttpEvent } from "#shared/types/generic/http";
import type { CreateUser } from "#shared/types/entities/user";
import EmailVerificationTokenModel from "#server/repositories/emailVerificationToken";
import EmailService from "#server/services/generic/email";
import { emailVerificationTemplate } from "~~/emails/templates";
import AuthenticationService from "#server/services/generic/authentication";

class UsersService {
  async createBasicUser(event: HttpEvent) {
    try {
      const body = await readBody<CreateUser>(event);
      const user = await UserModel.createBasic(body);

      await AuthenticationService.createSession(event, user.id);

      const emailVerificationToken = await EmailVerificationTokenModel.create(user.id);
      const verificationUrl = `${getRequestURL(event).origin}/auth/verify-email?token=${emailVerificationToken.token}`;

      const template = emailVerificationTemplate({ displayName: user.displayName, verificationUrl });
      await EmailService.send({
        to: user.email,
        subject: "Verify your email address — Aurora Lens",
        ...template,
      });

      event.node.res.statusCode = HttpCode.CREATED;
      event.node.res.statusMessage = "User created!";
      return user;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2002": return sendError(event, createError({
          statusCode: HttpCode.CONFLICT,
          statusMessage: "Username or email already in use.",
          data: {
            errorCode: ErrorCode.USER_CREATION_CONFLICT,
          },
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Internal server error.",
          data: {
            error,
            errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
          },
        }));
      }
    }
  }

  async getUser(event: HttpEvent) {
    const username = getRouterParam(event, "username");
    if (!username) return sendError(event, createError({
      statusCode: HttpCode.BAD_REQUEST,
      statusMessage: "Missing username.",
      data: {
        username,
      },
    }));

    try {
      return await UserModel.get(username);
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "User not found.",
          data: {
            username,
            errorCode: ErrorCode.USER_NOT_FOUND,
          },
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Internal server error.",
          data: {
            error,
            errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
          },
        }));
      }
    }
  }
}

const UserService = new UsersService();
export default UserService;
