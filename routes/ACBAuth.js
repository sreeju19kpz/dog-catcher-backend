import Express from "express";
import { register, login } from "../controllers/ACBAuthController.js";
const router = Express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
export default router;
