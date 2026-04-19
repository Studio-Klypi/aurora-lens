import { HttpCode, type HttpEvent } from "#shared/types/generic/http";
import SessionModel from "#server/repositories/session";
import { requireAuth } from "#server/utils/auth";
import UserModel from "#server/repositories/user";
import { ErrorCode } from "#shared/types/generic/errors";
import type { Prisma } from "@prisma/client";
import { verify } from "argon2";
import EmailVerificationTokenModel from "#server/repositories/emailVerificationToken";
import { emailVerificationTemplate, emailVerifiedTemplate } from "~~/emails/templates";
import EmailService from "#server/services/generic/email";

class Authentication {
  async getLoggedUser(event: HttpEvent) {
    return requireAuth(event);
  }

  async createSession(event: HttpEvent, userId: number) {
    const session = await SessionModel.create(userId);
    this.setCookies(event, session.token);
  }

  async login(event: HttpEvent) {
    try {
      const body = await readBody<{
        email: string;
        password: string;
      }>(event);
      const user = await UserModel.getByEmail(body.email, true);

      if (!user.passwordHash) return sendError(event, createError({
        statusCode: HttpCode.UNAUTHORIZED,
        statusMessage: "Invalid authentication method.",
        data: {
          errorCode: ErrorCode.INVALID_AUTH_METHOD,
        },
      }));
      if (!await verify(user.passwordHash, body.password)) return sendError(event, createError({
        statusCode: HttpCode.UNAUTHORIZED,
        statusMessage: "Invalid credentials.",
        data: {
          errorCode: ErrorCode.INVALID_CREDENTIALS,
        },
      }));

      if (!user.emailVerifiedAt) {
        const emailVerificationToken = await EmailVerificationTokenModel.create(user.id);
        const verificationUrl = `${getRequestURL(event).origin}/auth/verify-email?token=${emailVerificationToken.token}`;

        const template = emailVerificationTemplate({ displayName: user.displayName, verificationUrl });
        await EmailService.send({
          to: user.email,
          subject: "Verify your email address — Aurora Lens",
          ...template,
        });
      }

      await this.createSession(event, user.id);
      return await UserModel.get(user.username);
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "User not found.",
          data: {
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

  async logout() {}

  async verifyEmail(event: HttpEvent) {
    const user = requireAuth(event);

    try {
      const { token } = await readBody<{ token: string }>(event);
      if (!token) return sendError(event, createError({
        statusCode: HttpCode.BAD_REQUEST,
        statusMessage: "Missing token.",
      }));

      const verificationToken = await EmailVerificationTokenModel.verify(user.id, token);

      const newUser = await UserModel.update(user.id, { emailVerifiedAt: new Date() });
      await EmailVerificationTokenModel.use(verificationToken.id);

      const template = emailVerifiedTemplate({ displayName: newUser.displayName });
      await EmailService.send({
        to: newUser.email,
        subject: "Your account has been verified - Aurora Lens",
        text: template.text,
        html: template.html,
      });

      event.context.user = newUser;
      return newUser;
    }
    catch (e) {
      console.error(e);
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Invalid verification token.",
          data: {
            errorCode: ErrorCode.INVALID_VERIFICATION_TOKEN,
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

  async requestNewEmailVerificationToken(event: HttpEvent) {
    const user = requireAuth(event);

    try {
      const emailVerificationToken = await EmailVerificationTokenModel.create(user.id);
      const verificationUrl = `${getRequestURL(event).origin}/auth/verify-email?token=${emailVerificationToken.token}`;

      const template = emailVerificationTemplate({ displayName: user.displayName, verificationUrl });
      await EmailService.send({
        to: user.email,
        subject: "Verify your email address — Aurora Lens",
        ...template,
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  private setCookies(event: HttpEvent, token: string) {
    const config = useRuntimeConfig();

    setCookie(event, config.session.cookie, token, {
      secure: config.app.env !== "development",
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
  }

  private clearCookies(event: HttpEvent) {
    deleteCookie(event, useRuntimeConfig().session.cookie);
  }
}

const AuthenticationService = new Authentication();
export default AuthenticationService;
