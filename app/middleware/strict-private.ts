export default defineNuxtRouteMiddleware(() => {
  const store = useAuthStore();
  const { isLoggedIn } = storeToRefs(store);

  if (isLoggedIn.value) return;
  navigateTo("/auth/login");
});
