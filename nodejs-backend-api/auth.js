var express = require("express");

module.exports = function authentication(req, res, data, next) {
  var authheader = req.headers.authorization;
  console.log(req.headers);

  // check for basic auth header
  if (!authheader || authheader.indexOf("Basic ") === -1) {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }

  authheader = data;
}

exports.createBasicAuthToken = (username, password) => {
  const encodedBase64AuthToken = Buffer.from(
    `${username}:${password}`
  ).toString("base64");

  const token = "Basic " + encodedBase64AuthToken;

  return token;
};
