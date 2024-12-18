const koreanTimeOffset = 9 * 60 * 60 * 1000;

export const convertToKrTime = (
  isoDateString: string,
  onlyTime: boolean = false
) => {
  const inputDate = new Date(isoDateString);
  const now = new Date();

  const koreanDate = new Date(inputDate.getTime() + koreanTimeOffset);
  const koreanNow = new Date(now.getTime() + koreanTimeOffset);

  const isSameDay = isSameDayDate(koreanDate, koreanNow);

  const isYesterday =
    koreanDate.toDateString() ===
    new Date(koreanNow.getTime() - 24 * 60 * 60 * 1000).toDateString();

  const hours = koreanDate.getHours();
  const minutes = koreanDate.getMinutes().toString().padStart(2, '0');

  const period = hours < 12 ? '오전' : '오후';
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

  const timeString = `${period} ${formattedHour}:${minutes}`;

  if (onlyTime) {
    return timeString;
  }

  if (isSameDay) {
    return `${timeString}`;
  } else if (isYesterday) {
    return `(어제) ${timeString}`;
  } else {
    const year = koreanDate.getFullYear();
    const month = (koreanDate.getMonth() + 1).toString().padStart(2, '0');
    const day = koreanDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${timeString}`;
  }
};

const isSameDayDate = (inputDate: Date, now: Date) => {
  const koreanDate = new Date(inputDate.getTime() + koreanTimeOffset);
  const koreanNow = new Date(now.getTime() + koreanTimeOffset);

  const normalizedKoreanDate = new Date(
    koreanDate.getFullYear(),
    koreanDate.getMonth(),
    koreanDate.getDate()
  );
  const normalizedKoreanNow = new Date(
    koreanNow.getFullYear(),
    koreanNow.getMonth(),
    koreanNow.getDate()
  );

  return normalizedKoreanDate.getTime() === normalizedKoreanNow.getTime();
};
