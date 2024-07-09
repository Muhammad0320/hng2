import mongoose, { Schema } from "mongoose";

type OrgAttrs = {
  userId: string;
  name: string;
  description: string;
};

  type OrgDoc = mongoose.Document & OrgAttrs & {users: string[]} ;

type OrgModel = mongoose.Model<OrgDoc> & {
  buildOrg: (attrs: OrgAttrs) => Promise<OrgDoc>;
};

const orgSchema = new Schema<OrgDoc, OrgModel>(
  {
    name: {
      type: String,
      trim: true,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

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



orgSchema.statics.buildOrg = async (attrs: OrgAttrs) => {
  return await Org.create({ ...attrs, users: attrs.userId });
};

const Org = mongoose.model<OrgDoc, OrgModel>("Org", orgSchema);

export default Org;
