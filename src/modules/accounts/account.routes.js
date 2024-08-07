import { Router } from "express";
import * as accounts from "./account.controller.js";
import { auth } from "../../middleware/auth.js";

const accountRouter = Router();

accountRouter.post("/account", auth, accounts.createAccount);
accountRouter.post("/account/deposit", auth, accounts.deposit);
accountRouter.post("/account/withdraw", auth, accounts.withdraw);
accountRouter.get("/account/balance", auth, accounts.getBalance);
accountRouter.get("/account/transactions", auth, accounts.getTransactions);

export default accountRouter;
