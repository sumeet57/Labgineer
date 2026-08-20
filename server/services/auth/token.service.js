import jwt from "jsonwebtoken";
import env from "../../config/env.js";

export const cookieOptionsAccess = {
  httpOnly: true,
  secure: env.NODE_ENV === "production", // true in production, false in development
  maxAge: 30 * 60 * 1000, // 30 minutes
  sameSite: "Strict", // lax/strict in development, strict in production(server and client on same domain), none in production if client and server are on different domains.
};
export const cookieOptionsRefresh = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  sameSite: "Strict",
};

const ACCESS_SECRET = env.ACCESS_SECRET;
const REFRESH_SECRET = env.REFRESH_SECRET;

export function generateTokens(userId) {
  const accessToken = jwt.sign({ userId: userId }, ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign({ userId: userId }, REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}

export function setAuthCookies(res, tokens) {
  res.cookie("accessToken", tokens.accessToken, cookieOptionsAccess);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptionsRefresh);
}
