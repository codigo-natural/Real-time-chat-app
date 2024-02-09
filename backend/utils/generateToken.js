import Jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS atacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // https only in production
  });
};

export default generateTokenAndSetCookie;
