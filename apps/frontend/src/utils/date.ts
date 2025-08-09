import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(new Date(date), "d/MM/yyyy");
};

export const formatDateRange = (startDate: Date, endDate: Date) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
