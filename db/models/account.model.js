import { Schema, Types, model } from "mongoose";

const accountSchema = Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const accountModel = model("account", accountSchema);

export default accountModel;
