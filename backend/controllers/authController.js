const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

let refreshTokens = [];

async function token(req, res) {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
}

async function login(req, res) {
  // Authentification User
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({message: " User not found !" });
  }
  if (user.password != password) {
    return res.status(401).json({ message: "Invalide creadentials !" });
  }

  const accessToken = generateAccessToken({username : user.username , password : user.password});
  const refreshToken = jwt.sign({username : user.username , password : user.password}, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  console.log(user);
  res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
}

async function logout(req, res) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}


async function register(req, res) {
  try {
    // Créer une instance de l'utilisateur avec les données fournies
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    // Enregistrer l'utilisateur dans la base de données
    const savedUser = await newUser.save();

    console.log("Utilisateur enregistré avec succès:", savedUser);
    return savedUser;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    throw error;
  }
}

module.exports = { login, logout, token, register };
