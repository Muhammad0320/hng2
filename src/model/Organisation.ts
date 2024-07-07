import mongoose, { Schema } from "mongoose";

type OrgAttrs = {
  userId: string;
  name: string;
  description: string;
};

type OrgDoc = mongoose.Document & OrgAttrs;

type OrgModel = mongoose.Model<OrgDoc> & {
  buildOrg: (attrs: OrgAttrs) => Promise<OrgDoc>;
};

const orgSchema = new Schema<OrgDoc, OrgModel>(
  {
    name: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.orgId = ret._id;
        delete ret._id;
      },
    },
  }
);

orgSchema.virtual("users", {
  localField: "_id",
  foreignField: "users",
  ref: "User",
});

orgSchema.statics.buildOrg = async (attrs: OrgAttrs) => {
  return await Org.create({...attrs, userId: [ attrs.userId ] });
};

const Org = mongoose.model<OrgDoc, OrgModel>("Org", orgSchema);

export default Org;
