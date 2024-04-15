import moment from "moment-timezone";

export const setDateHours = (
  date: Date,
  hours: number,
  minutes?: number
): Date => {
  const newDate = moment(date).tz("Europe/Vilnius").toDate();
  newDate.setHours(hours);
  newDate.setMinutes(minutes ?? 0);
  newDate.setSeconds(0);

  return newDate;
};

export const getDateFromTimeString = (time: string, baseDate: Date): Date => {
  const newDate = moment(time).tz("Europe/Vilnius");
  newDate.year(baseDate.getFullYear());
  newDate.month(baseDate.getMonth());
  newDate.date(baseDate.getDate());

  return newDate.toDate();
};

export const convertTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
};

export const getDate = (date: Date, time: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const hours = time.getHours();
  const minutes = time.getMinutes();

  return new Date(year, month, day, hours, minutes);
};

export enum WeekDayEnum {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export const hexToRgba = (hex: string, alpha?: number): string => {
  const red = parseInt(hex.slice(1, 3), 16),
    green = parseInt(hex.slice(3, 5), 16),
    blue = parseInt(hex.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha ?? 1})`;
};
