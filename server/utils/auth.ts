import type { User } from "@prisma/client";
import { HttpCode, type HttpEvent } from "#shared/types/generic/http";

export function requireAuth(event: HttpEvent): User {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: HttpCode.UNAUTHORIZED,
      statusMessage: "Authentication required.",
    });
  }

  return user;
}
