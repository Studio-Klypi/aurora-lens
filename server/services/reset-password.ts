import type { HttpEvent } from "#shared/types/generic/http";
import { HttpCode } from "#shared/types/generic/http";
import PasswordResetModel from "#server/repositories/passwordResetRequest";
import { ErrorCode } from "#shared/types/generic/errors";
import UserModel from "#server/repositories/user";
import type { Prisma } from "@prisma/client";
import { passwordResetConfirmedTemplate, passwordResetTemplate } from "~~/emails/templates";
import EmailService from "#server/services/generic/email";
import SessionModel from "#server/repositories/session";

class ResetPassword {
  async createToken(event: HttpEvent) {
    const { email } = await readBody<{ email: string }>(event);
    if (!email) return sendError(event, createError({
      statusCode: HttpCode.BAD_REQUEST,
      statusMessage: "Missing email.",
      data: {
        errorCode: ErrorCode.PR_MISSING_FIELD,
      },
    }));

    try {
      const user = await UserModel.getByEmail(email);
      const prToken = await PasswordResetModel.create(user.id);

      const template = passwordResetTemplate({
        displayName: user.displayName,
        resetUrl: `${getRequestURL(event).origin}/auth/reset-password?token=${prToken.token}`,
      });
      await EmailService.send({
        to: user.email,
        subject: "Reset your password - Aurora Lens",
        text: template.text,
        html: template.html,
      });
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
        }));
      }
    }
  }

  async resetPassword(event: HttpEvent) {
    const { token, password } = await readBody<{ token: string; password: string }>(event);
    if (!token || !password) return sendError(event, createError({
      statusCode: HttpCode.BAD_REQUEST,
      statusMessage: "Missing token or new password.",
      data: {
        errorCode: ErrorCode.PR_MISSING_FIELD,
      },
    }));

    try {
      const prToken = await PasswordResetModel.verify(token);

      await SessionModel.revokeAll(prToken.userId);
      const user = await UserModel.update(prToken.userId, {
        password,
      });
      await PasswordResetModel.use(token);

      const template = passwordResetConfirmedTemplate({ displayName: user.displayName });
      await EmailService.send({
        to: user.email,
        subject: "Your password has been reset - Aurora Lens",
        text: template.text,
        html: template.html,
      });

      return user;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Invalid reset token.",
          data: {
            token,
            errorCode: ErrorCode.PR_TOKEN_NOT_FOUND,
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

const ResetPasswordService = new ResetPassword();
export default ResetPasswordService;
