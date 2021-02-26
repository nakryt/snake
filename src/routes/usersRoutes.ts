import express, { Request } from "express";

import User from "../models/User";

const usersRoute = express.Router();

interface UsersRequest extends Request {
  body: {
    id?: string;
    username: string;
  };
}
usersRoute.post("/", async (req: UsersRequest, res) => {
  try {
    const { username, id } = req.body;
    if (id) {
      const user = await User.findById(id);
      if (user) return res.status(200).json({ error: false, user });
      return res.status(401).json({ error: true, message: "User not found." });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({ error: false, user });
    }

    const newUser = new User({
      username,
      scores: 0,
    });
    await newUser.save();
    return res.status(201).json({ error: false, user: newUser });
  } catch (e) {
    res.status(501).json({ message: e.message, error: true });
  }
});

export default usersRoute;
