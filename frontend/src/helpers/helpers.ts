import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { IReview } from "shared/src/interfaces";

export const updateSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string
) => {
  if (searchParams.has(key)) {
    searchParams.set(key, value);
  } else {
    searchParams.append(key, value);
  }

  return searchParams;
};

export const toastNotification = (err: any) => {
  let errMessage =
    err?.cause?.result?.errors?.[0]?.message ||
    err?.message ||
    "An error occurred";

  if (errMessage.includes("Not Authorised")) {
    errMessage = "Invalid credentials!";
  }

  toast({
    variant: "destructive",
    title: "Authentication Error",
    description: errMessage,
    duration: 1500,
  });
};

export const getUserName = (fullName: any) => {
  const nameSplice = fullName
    ?.split(" ")
    .map((item: string) => item.charAt(0))
    .join("");
  return nameSplice;
};

export const calculateRent = (daysRent: number, rentPerDay: number) => {
  const rent = daysRent * rentPerDay;
  const tax = rent * 0.15;
  const discount = 0;
  const total = rent + tax - discount;
  return {
    rent,
    tax,
    discount,
    total,
  };
};

export const adjustDateLocalTimeZone = (date: Date | undefined) => {
  if (!date) return null;

  const localDate = new Date(date);

  localDate.setMinutes(date?.getMinutes() - date?.getTimezoneOffset());

  return localDate;
};
export const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(parseInt(date));
  }

  return format(date, "yyyy-MM-dd");
};

export const getAllDatesBetween = (startDate: Date, endDate: Date) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(formatDate(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export const calculateTablePaginationStart = (
  currentPage: number,
  resPerPage: number
) => {
  const start = (currentPage - 1) * resPerPage + 1;
  return start;
};

export const calculateTablePaginationEnd = (
  currentPage: number,
  resPerPage: number,
  totalCount: number
) => {
  const end = Math.min(currentPage * resPerPage, totalCount);
  return end;
};

export const findReviewByUserId = (reviews: IReview[], userId: string) => {
  return reviews.find((review) => review?.user?.id === userId);
};

export const formatAmountWithCommas = (amount: number) => {
  return new Intl.NumberFormat("en-US").format(amount);
};
