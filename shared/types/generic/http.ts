import type { H3Event } from "h3";

export type HttpEvent = H3Event<Request>;

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  INTERNAL_SERVER_ERROR = 500,
}
