import jwt from "jsonwebtoken";
import pem from "../jwtSecret";

export const jwtSign = function (userId) {
  const jwtToken = jwt.sign(
    {
      sub: userId,
      iat: Math.floor(new Date().getTime() / 1000),
      exp: Math.floor((new Date().getTime() / 1000) + 3600),
    },
    pem,
    {
      algorithm: "RS256",
      keyid: "2324kd",
    },
  );

  return jwtToken;
};
