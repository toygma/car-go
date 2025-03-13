import { IBooking, IUser } from "shared";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking.model";
import { BookingInput } from "../types/booking.types";
import { NotFoundError } from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";

interface SalesData {
  date: string;
  sales: number;
  bookings: number;
}

interface SalesStats {
  salesData: SalesData[];
  totalSales: number;
  totalBookings: number;
  totalPendingCash: number;
  totalPaidCash: number;
}

export const createBooking = catchAsyncErrors(
  async (bookingInput: BookingInput, userId: string) => {
    const newBooking = await Booking.create({
      ...bookingInput,
      user: userId,
    });
    return newBooking;
  }
);

export const getBookingById = catchAsyncErrors(
  async (bookingId: string, user: IUser) => {
    const booking = await Booking.findById(bookingId).populate("car");

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (!user.role?.includes("admin") && booking.user.toString() !== user.id) {
      throw new NotFoundError(
        "You do not have permission to access this action"
      );
    }

    return booking;
  }
);

export const updateBooking = catchAsyncErrors(
  async (
    bookingId: string,
    bookingInput: Partial<BookingInput>,
    user: IUser
  ) => {
    if (!bookingInput) {
      throw new NotFoundError("bookingInput is required");
    }
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (!user.role?.includes("admin") && booking.user.toString() !== user.id) {
      throw new NotFoundError(
        "You do not have permission to access this action"
      );
    }

    await booking.set(bookingInput).save();

    return true;
  }
);

export const getCarBookedDates = catchAsyncErrors(async (carId: string) => {
  const bookings = await Booking.find({ car: carId });

  const bookedDates = bookings.flatMap((booking) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const dates: Date[] = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date));
    }

    return dates;
  });

  return bookedDates;
});

export const myBookings = catchAsyncErrors(
  async (page: number, filters: any, query: string) => {
    const resPerPage = 3;

    const apiFilters = new APIFilters(Booking).filters(filters).populate("car");

    let bookings = await apiFilters.model;

    const totalAmount = bookings?.reduce(
      (acc: number, booking: IBooking) => acc + booking.amount.total,
      0
    );

    const totalBookings = bookings.length;
    const totalUnpaidBookings = bookings.filter(
      (booking: IBooking) => booking.paymentInfo.status !== "paid"
    ).length;

    apiFilters.search(query);

    bookings = await apiFilters.model.clone();

    let totalCount = bookings.length;

    apiFilters.pagination(page, resPerPage);
    bookings = await apiFilters.model.clone();

    return {
      bookings,
      totalAmount,
      totalBookings,
      totalUnpaidBookings,
      pagination: {
        totalCount,
        resPerPage,
      },
    };
  }
);

//sales data give

const getSalesData = async (
  startDate: Date,
  endDate: Date
): Promise<SalesStats> => {
  const salesData = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $facet: {
        salesData: [
          {
            $group: {
              _id: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                  },
                },
              },
              totalSales: { $sum: "$amount.total" },
              numOfBookings: { $sum: 1 },
            },
          },
          { $sort: { "_id.date": 1 } },
        ],
        pendingCashData: [
          {
            $match: { "paymentInfo.status": "pending" },
          },
          {
            $group: {
              _id: null,
              totalPendingCash: { $sum: "$amount.total" },
            },
          },
        ],
        paidCashData: [
          {
            $match: {
              "paymentInfo.status": "paid",
              "paymentInfo.method": "cash",
            },
          },
          {
            $group: {
              _id: null,
              totalPaidCash: { $sum: "$amount.total" },
            },
          },
        ],
      },
    },
  ]);

  if (!salesData.length) {
    return {
      salesData: [],
      totalSales: 0,
      totalBookings: 0,
      totalPendingCash: 0,
      totalPaidCash: 0,
    };
  }
  const {
    salesData: salesDataResult = [],
    pendingCashData: pendingCashDataResult = [],
    paidCashData: paidCashDataResult = [],
  } = salesData[0];

  const salesMap = new Map<string, { sales: number; bookings: number }>();
  let totalSales = 0;
  let totalBookings = 0;

  salesDataResult.forEach((data: any) => {
    const date = data?._id?.date;
    const sales = data?.totalSales || 0;
    const bookings = data?.numOfBookings || 0;

    salesMap.set(date, { sales, bookings });
    totalSales += sales;
    totalBookings += bookings;
  });

  let currentDate = new Date(startDate);
  const finalSalesData: SalesData[] = [];
  // Tarih aralığını oluştur ve eksik günleri 0 ile doldur
  while (currentDate <= endDate) {
    const date = currentDate.toISOString().split("T")[0];
    finalSalesData.push({
      date,
      sales: salesMap.get(date)?.sales || 0,
      bookings: salesMap.get(date)?.bookings || 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    salesData: finalSalesData,
    totalSales,
    totalBookings,
    totalPendingCash: pendingCashDataResult[0]?.totalPendingCash || 0,
    totalPaidCash: paidCashDataResult[0]?.totalPaidCash || 0,
  };
};

export const getDashboardStats = catchAsyncErrors(
  async (startDate: Date, endDate: Date) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const {
      salesData,
      totalSales,
      totalBookings,
      totalPendingCash,
      totalPaidCash,
    } = await getSalesData(startDate, endDate);

    return {
      sales: salesData,
      totalSales,
      totalBookings,
      totalPendingCash,
      totalPaidCash,
    };
  }
);
