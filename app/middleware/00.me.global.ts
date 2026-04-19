export default defineNuxtRouteMiddleware(async () => {
  const store = useAuthStore();
  const { isLoggedIn } = storeToRefs(store);

  if (isLoggedIn.value) return;

  await store.recoverUser();
});
