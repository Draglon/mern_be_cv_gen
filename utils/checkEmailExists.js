import UserModel from "../models/User.js";

export default async (email) => {
  const user = await UserModel.findOne({ email });
  return !!user;
};