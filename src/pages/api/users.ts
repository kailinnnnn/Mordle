import connectToDatabase from "../../utils/mongodb";
import { User } from "../../utils/types";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  const db = mongoose.connection.db;
  const collection = db.collection("users");

  switch (req.method) {
    case "GET":
      const { _id, name } = req.body as User;
      const query: any = {};
      if (_id) query._id = _id;
      if (name) query.name = name;
      const users = await collection.find(query).toArray();
      res.json(users);
      break;

    case "POST":
      const user = req.body;
      await collection.insertOne(user);
      res.status(201).json(user);
      break;

    case "PUT":
      try {
        const { _id, score } = req.body;
        if (!_id || score === undefined) {
          res.status(400).json({ message: "Invalid input" });
          return;
        }

        const result = await collection.updateOne({ _id }, { $set: { score } });

        if (result.modifiedCount === 1) {
          const updatedUser = await collection.findOne({
            _id,
          });
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: "User not found or not updated" });
        }
      } catch (error: any) {
        console.error("Error updating user:", error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
      }
      break;

    default:
      break;
  }
}
