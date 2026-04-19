export function useCountdown(cb: () => Promise<void> | void, rounds: number = 5, delay: number = 1000) {
  const interval = ref<NodeJS.Timeout | null>(null);
  const remainingRounds = ref<number>(rounds);

  function start() {
    if (interval.value) clear();

    interval.value = setInterval(() => {
      if (remainingRounds.value <= 0) {
        void cb();
        clear();
        return;
      }
      remainingRounds.value--;
    }, delay);
  }

  function clear() {
    if (!interval.value) return;

    clearInterval(interval.value);
    interval.value = null;
  }

  onBeforeUnmount(() => clear());

  return {
    interval,
    remainingOccurrations: remainingRounds,

    start,
    clear,
  };
}
