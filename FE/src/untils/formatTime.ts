export const formatTime = (time: string) => {
  if (!time) return "";
  // tách HH:mm từ HH:mm:ss
  return time.slice(0, 5);
};
