import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(new Date(date), "MMMM d, yyyy");
};

export const formatDateRange = (startDate: Date, endDate: Date) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
