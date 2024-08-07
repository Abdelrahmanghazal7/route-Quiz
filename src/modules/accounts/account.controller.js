import accountModel from "../../../db/models/account.model.js";
import transactionModel from "../../../db/models/transaction.model.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";

export const createAccount = asyncHandler(async (req, res, next) => {
  let account = new accountModel({ userId: req.user.id });
  await account.save();
  res.json(account);
});

export const deposit = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  let account = await accountModel.findOne({ userId: req.user.id });
  account.balance += amount;
  await account.save();

  const transaction = new transactionModel({
    accountId: account.id,
    amount,
    type: "deposit",
  });
  await transaction.save();

  res.json(account);
});

export const withdraw = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  let account = await accountModel.findOne({ userId: req.user.id });
  if (account.balance < amount) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  account.balance -= amount;
  await account.save();

  const transaction = new transactionModel({
    accountId: account.id,
    amount,
    type: "withdraw",
  });
  await transaction.save();

  res.json(account);
});

export const getBalance = asyncHandler(async (req, res, next) => {
  let account = await accountModel.findOne({ userId: req.user.id });
  res.json({ balance: account.balance });
});

export const getTransactions = asyncHandler(async (req, res, next) => {
  let account = await accountModel.findOne({ userId: req.user.id });
  let transactions = await transactionModel.find({ accountId: account.id });
  res.json(transactions);
});
