import mongoose from "mongoose";
import { CryptoManager } from "../services/Crypto";

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
  buildUser: (attrs: UserAttrs) => Promise<UserDoc>;
};

const userSchema = new mongoose.Schema<UserDoc, UserModel>(
  {
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

    passwordConfirm: {
      type: String,
      validate: {
        validator: function(this: UserDoc, value: string): boolean {
          return this.password === value;
        },

        message: "Passwords are not the same",
      },
    },

    phone: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.userId = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.virtual("organisations", {
  foreignField: "users",
  localField: "_id",
  ref: "Organisation",
});

userSchema.pre("save", async function(next) {
  if (this.isNew) {
    this.passwordConfirm = undefined as any;

    this.password = (await CryptoManager.hash(this.password)) as string;
  }

  next();
});

userSchema.statics.buildUser = async function(attrs: UserAttrs) {
  return await User.create(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export default User;
