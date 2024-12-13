export const convertToKrTime = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const utcTime = date.getTime();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstTime = new Date(utcTime + kstOffset);
  const hours = kstTime.getHours();
  const minutes = kstTime.getMinutes();

  const period = hours >= 12 ? '오후' : '오전';
  const adjustedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  return `${period} ${adjustedHours}:${String(minutes).padStart(2, '0')}`;
};
