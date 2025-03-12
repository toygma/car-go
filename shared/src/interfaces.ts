export const CarStatus = ["Draft", "Active"];
export const CarBrand = [
  "Audi",
  "BMW",
  "Ford",
  "Honda",
  "Hyundai",
  "Nissan",
  "Toyota",
];
export const CarCategories = ["Sedan", "Convertible", "SUV", "Hatchback"];

export const BookingPaymentMethods = ["card", "cash"];
export const BookingPaymentStatus = ["paid", "pending"];

export const CarFuelTypes = ["Petrol", "Diesel"];
export const CarTransmissions = ["Automatic", "Manual"];
export const UserRoles = ["user", "admin"];
export const CarDoors = [2, 4];
export const CarSeats = [2, 4, 5, 7, 8, 9, 10];
export const CarModels = [
  "A4",
  "X5",
  "SUV",
  "Civic",
  "Elantra",
  "Altima",
  "Camry",
  "Impala",
  "C-Class",
  "Golf",
];

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNo: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  role?: string[];
  createdAt: string;
  updatedAt: string;
  getResetPasswordToken(): string;
}

export interface ICar {
  id: string;
  _id: string;
  name: string;
  description: string;
  status: string;
  rentPerDay: number;
  address: string;
  location?: {
    type?: "Point";
    coordinates?: number[];
    formattedAddress?: string;
    streetName?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    zipCode?: string;
    country?: string;
    countryCode?: string;
  };
  images: {
    url: string;
    public_id: string;
  }[];
  reviews: string[];
  brand: string;
  year: number;
  transmission: string;
  doors: number;
  fuelType: string;
  milleage: number;
  seats: number;
  power: number;
  category: string;
  ratings: {
    value: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking {
  id: string;
  user: IUser;
  car: ICar;
  startDate: Date;
  endDate: Date;
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
  paymentInfo: {
    id: string;
    status: string;
    method: string;
  };
  additionalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  id: string;
  user: IUser;
  car: ICar;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
