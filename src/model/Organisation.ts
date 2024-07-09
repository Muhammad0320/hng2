import mongoose, { Schema } from "mongoose";
import { UserDoc } from "./User";

type OrgAttrs = {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
};

type OrgDoc = mongoose.Document & OrgAttrs & { users: mongoose.Schema.Types.ObjectId[] };

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
        // required: true,
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

  console.log(attrs.userId, "The user id provided to the org");
    
  const org = await Org.create({ ...attrs, users: [attrs.userId ]});


  console.log(org);

  return org;
};

const Org = mongoose.model<OrgDoc, OrgModel>("Org", orgSchema);

export default Org;
