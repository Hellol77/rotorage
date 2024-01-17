import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";

export const relativeDate = (date: Date) => {
  dayjs.extend(utc);
  dayjs.locale("ko");
  dayjs.extend(relativeTime);
  dayjs.extend(timezone);

  return dayjs().to(dayjs(date).utc().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"));
};
