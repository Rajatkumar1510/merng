import User from "../../models/User.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators.js";

import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";
import SECRET from "../../config.js";

export default {

  Mutation: {
    // Login  a user
    login: async (parents, args, context, info) => {
      let { username, password } = args.loginInput;
      // validate login data
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User doesn't exist ";
        throw new UserInputError("User doesn't exist ", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials";
        throw new UserInputError("Wrong Credentials", { errors });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        SECRET,
        { expiresIn: "1h" }
      );
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    // Registering a user
    register: async (parents, args, context, info) => {
      let { email, username, password, confirmPassword } = args.registerInput;

      // validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // check if user already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // Hash password and create a auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          username: res.username,
          email: res.email,
        },
        SECRET,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
