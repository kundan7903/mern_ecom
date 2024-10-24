import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERNSTACK",
    })
    .then(() => {
      console.log("Database Connected!");
    })
    .catch((err) => {
      console.log("Database Connection Failed!");
    });
};
