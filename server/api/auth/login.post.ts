import AuthenticationService from "#server/services/generic/authentication";

export default defineEventHandler(event => AuthenticationService.login(event));
