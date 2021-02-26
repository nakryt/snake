import { model, Schema, Document } from "mongoose";
import { IUser } from "../typings/IUser";

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  scores: { type: Number, required: true, default: 0 },
});

export default model<IUser & Document>("users", schema);
