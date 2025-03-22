import { rule, shield, and } from "graphql-shield";

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context) => {
    return context?.user !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(async (parent, args, context) => {
  return context?.user?.role?.includes("admin");
});

export const permissions = shield(
  {
    Query: {
      getAllBookings: isAuthenticated,
      getAllUsers: and(isAuthenticated, isAdmin),
      me: isAuthenticated,
      logout: isAuthenticated,
      getBookingById: isAuthenticated,
      myBookings: isAuthenticated,
      getDashboardStats: and(isAuthenticated, isAdmin),

      getAllReviews: isAuthenticated,
      canReview: isAuthenticated,
    },
    Mutation: {
      createCar: and(isAuthenticated, isAdmin),
      updateCar: and(isAuthenticated, isAdmin),
      deleteCarImage: and(isAuthenticated, isAdmin),
      deleteCar: and(isAuthenticated, isAdmin),

      updateBooking: isAuthenticated,
      deleteBooking: and(isAuthenticated, isAdmin),
      createBooking: isAuthenticated,

      updateUserProfile: isAuthenticated,
      updatePassword: isAuthenticated,
      updateAvatar: isAuthenticated,
      updateUser: and(isAuthenticated, isAdmin),
      deleteUser: and(isAuthenticated, isAdmin),

      createCoupon: and(isAuthenticated, isAdmin),
      updateCoupon: and(isAuthenticated, isAdmin),
      deleteCoupon: and(isAuthenticated, isAdmin),

      createFaq: and(isAuthenticated, isAdmin),
      updateFaq: and(isAuthenticated, isAdmin),
      deleteFaq: and(isAuthenticated, isAdmin),

      stripeCheckoutSession: and(isAuthenticated, isAdmin),

      createUpdateReview: isAuthenticated,
      deleteReview: and(isAuthenticated, isAdmin),
    },
  },
  {
    debug: true,
  }
);
