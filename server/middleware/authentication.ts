import SessionModel from "#server/repositories/session";

export default defineEventHandler(async (event) => {
  const cookieName = useRuntimeConfig().session.cookie;
  const token = getCookie(event, cookieName);

  if (!token) {
    event.context.user = null;
    return;
  }

  try {
    event.context.user = await SessionModel.verify(token);
  }
  catch (e) {
    console.error(e);
    event.context.user = null;
  }
});
