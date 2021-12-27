import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const passwordRoutes = Router();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post(
    "/forgot",
    ensureAuthenticated,
    sendForgotPasswordMailController.handle
);

export { passwordRoutes };
