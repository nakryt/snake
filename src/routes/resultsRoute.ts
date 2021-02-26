import express, { Request } from "express";

import User from "../models/User";

const resultsRoute = express.Router();

interface ResultRequest extends Request {
  body: {
    id: string;
    username: string;
    scores: string;
  };
}

resultsRoute.get("/", async (req, res) => {
  try {
    const results = await User.find().sort({ scores: -1 });
    res.status(200).json({ results, error: false });
  } catch (e) {
    res.status(501).json({ message: e.message, error: true });
  }
});

resultsRoute.post("/", async (req: ResultRequest, res) => {
  try {
    const { id, username, scores } = req.body;
    const user = await User.findById(id);

    if (!user) {
      const newUser = new User({
        username,
        scores,
      });
      await newUser.save();
      return res.status(201).json({
        user: newUser,
        error: false,
      });
    }

    const newScores = parseInt(scores);

    if (isNaN(newScores))
      return res
        .status(401)
        .json({ error: true, message: "Wrong scores value." });

    user.scores += newScores;
    await user.save();

    return res.status(200).json({
      user,
      error: false,
    });
  } catch (e) {
    res.status(501).json({ message: e.message, error: true });
  }
});

export default resultsRoute;
