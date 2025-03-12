import { NotFoundError } from "../utils/errorHandler";

export const catchAsyncErrors =
  (fn: Function) =>
  (...args: any[]) =>
    Promise.resolve(fn(...args)).catch((err) => {
      if (err?.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        throw new Error(message);
      }

      // Mongoose CastError (Geçersiz ObjectId gibi hatalar)
      if (err.name === "CastError") {
        const castMessage = `Resource not found. Invalid ${err?.path || "ID"}`;
        throw new NotFoundError(castMessage);
      }

      // Mongoose ValidationError (Geçersiz giriş verisi)
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors)
          .map((value: any) => value.message)
          .join(", ");
        throw new NotFoundError(messages);
      }

      throw err;
    });
