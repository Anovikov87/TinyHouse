import { Database, User, Listing, Booking } from "./../lib/types";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MongoClient } from "mongodb";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("main");

  return {
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
  };
};
