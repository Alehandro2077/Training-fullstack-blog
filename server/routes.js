import express from "express";

import {
  regValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";

import checkAuth from "./utils/checkAuth.js";

import UserController from "./controllers/User.Controller.js";
import PostController from "./controllers/PostController.js";

import validErrors from "./utils/handleValidationErrors.js";

const router = express.Router();

router.post("/auth/reg", regValidation, validErrors, UserController.register);
router.post("/auth/login", loginValidation, UserController.login);
router.get("/auth/me", checkAuth, UserController.getMe);

router.get("/posts/tags", PostController.getTags);

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);

router.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  validErrors,
  PostController.create
);
router.delete("/posts/:id", checkAuth, PostController.remove);
router.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  validErrors,
  PostController.update
);

export default router;
