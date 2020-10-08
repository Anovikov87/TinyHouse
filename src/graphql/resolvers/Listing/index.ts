import { ObjectId } from "mongodb";
import { Database, Listing } from "../../../lib/types";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IResolvers } from "apollo-server-express";

export const listingResolver: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      //throw new Error("My Error!");
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteRes.value) {
        throw new Error("failed to delete listing");
      }
      return deleteRes.value;
    },
  },
  Listing: {
    id: (listing: Listing) => listing._id.toString(),
  },
};
