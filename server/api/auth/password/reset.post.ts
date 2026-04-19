import ResetPasswordService from "#server/services/reset-password";

export default defineEventHandler(event => ResetPasswordService.resetPassword(event));
