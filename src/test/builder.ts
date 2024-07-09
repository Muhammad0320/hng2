import mongoose from "mongoose";
import Org from "../model/Organisation";
import User from "../model/User";

export const userBuilder = (id?: string) =>
  User.buildUser({
    email: "shitmail@gmail.com",
    firstName: "Muhammad",
    lastName: "Balogun",
    password: "shitPassword",
    passwordConfirm: "shitPassword",
    phone: 2349166537641,
  });

export const orgBuilder = (userId: mongoose.Schema.Types.ObjectId) =>
  Org.buildOrg({
    userId: userId,
    name: "Muhmaads org",
    description: "This is muhammads org",
  });
