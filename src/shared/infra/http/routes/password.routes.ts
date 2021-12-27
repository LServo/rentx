import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const passwordRoutes = Router();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post(
    "/forgot",
    ensureAuthenticated,
    sendForgotPasswordMailController.handle
);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
