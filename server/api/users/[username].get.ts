import UserService from "#server/services/users";

export default defineEventHandler(event => UserService.getUser(event));
