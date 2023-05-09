import { body } from "express-validator";

export const regValidation = [
  body("email", "Bad email").isEmail(),
  body("password", "passw must be > 5 sym").isLength({ min: 5 }),
  body("name", "name must be > 2 sym").isLength({ min: 3 }),
  body("avatarUrl", "avatar bad url").optional().isURL(),
];

export const loginValidation = [
  body("email", "Bad email").isEmail(),
  body("password", "passw must be > 5 sym").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "bad title").isLength({ min: 3 }).isString(),
  body("text", "bad text").isLength({ min: 3 }).isString(),
  body("tags", "bad format of tags(array need)").optional().isArray(),
  body("imageUrl", "image bad url").optional().isString(),
];
