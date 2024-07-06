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


type UserModel = mongoose.Model<UserDoc> & {

    buildUser: (attrs: UserAttrs) => UserDoc; 

};


const userSchema = new mongoose.Schema<UserDoc, UserModel>({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },

  lastName: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
    trim: true,
  },
});