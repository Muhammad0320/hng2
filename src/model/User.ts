import mongoose from "mongoose";

type UserAttrs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: number;
};

type UserDoc = mongoose.Document & UserAttrs;
