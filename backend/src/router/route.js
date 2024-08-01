import { Router } from "express";
import * as controller from "../controller/controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/users/signup").post(controller.signUp);
router.route("/users/signin").post(controller.signIn);
router.route("/users/logout").post(verifyJWT,controller.userLogout);
router.route("/admin").post(controller.adminLogin);
router.route("/feedback").post(verifyJWT,controller.feedBack);
router.route("/feedbackdata").get(controller.feedbackData);
router.route("/deletefeedback/:id").delete(controller.adminfeedbackdelete);
router.route("/getfeedbackdata/:id").get(controller.getSingleFeedbackData);
router.route("/editfeedbackdata").put(controller.editFeedbackData);
// router.route('/sendmail').post(controller.sendMailFun);
router.route('/verifymail').post(controller.verifyEmail)
router.route('/resentmail').post(controller.resentEmail)
router.route('/forgotpasswordmaill').post(controller.resentforgotPasswordEmail)
router.route('/verifyforgotpassword').post(controller.verifyForgotPassword)

export default router;
