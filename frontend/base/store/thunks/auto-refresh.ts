let refreshTimer: NodeJS.Timeout | null = null;

export function scheduleTokenRefresh(expTime: number, refreshCallback: () => void) {
  const now = Date.now();
  const timeLeft = expTime - now;
  const refreshBefore = 5 * 60 * 1000; // 5 phút

  if (refreshTimer) clearTimeout(refreshTimer);

  if (timeLeft > refreshBefore) {
    refreshTimer = setTimeout(() => {
      refreshCallback(); // Gọi refresh
    }, timeLeft - refreshBefore);
  } else {
    // Nếu đã gần hết hạn -> refresh luôn
    refreshCallback();
  }
}
