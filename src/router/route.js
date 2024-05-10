import { Router } from "express";
import * as controller from "../controller/controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/users/signup").post(controller.signUp);
router.route("/users/signin").post(controller.signIn);
router.route("/users/logout").post(verifyJWT,controller.userLogout);
router.route("/admin").post(controller.userLogout);
router.route("/feedback").post(verifyJWT,controller.feedBack);

export default router;
