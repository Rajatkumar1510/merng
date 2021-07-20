import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import SECRET from "../config.js";
export default (context) => {
  const authHeder = context.req.headers.authorization;
  
  if (authHeder) {
    const token = authHeder.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    }
    throw new Error("Authentication token wrong format");
  }
  throw new Error("Authorization Header must be provided");
};
