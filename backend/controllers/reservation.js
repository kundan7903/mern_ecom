import ErroHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErroHandler("Please fill all entries!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, phone, date, time });
    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErroHandler(validationErrors.join(", "), 400));
    }
    return next(new ErroHandler(error.message, 500));
  }
};
