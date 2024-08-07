import { Schema, Types, model } from "mongoose";

const transactionSchema = Schema(
  {
    accountId: {
      type: Types.ObjectId,
      ref: "account",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const transactionModel = model("transaction", transactionSchema);

export default transactionModel;
