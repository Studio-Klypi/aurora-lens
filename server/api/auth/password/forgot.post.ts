import ResetPasswordService from "#server/services/reset-password";

export default defineEventHandler(event => ResetPasswordService.createToken(event));
