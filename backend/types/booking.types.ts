export type BookingInput = {
  car: string;
  startDate: string;
  endDate: string;
  customer: {
    name: string;
    email: string;
    phoneNo: string;
  };
  amount: {
    rent: number;
    discount: number;
    tax: number;
    total: number;
  };
  daysOfRent: number;
  rentPerDay: number;
  additionalNotes: string;
};
