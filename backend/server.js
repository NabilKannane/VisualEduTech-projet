require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const app = require("./app");


// middleware
app.use(express.json())

// connexion Mongodb

const DB_URI=process.env.DB_URI


const connectDb = async () => {
    try {
      await mongoose.connect(DB_URI)
      console.log("CONNECTED MONGODB !")
      
    } catch (error) {
      console.log(error.message)
    }
}

  connectDb();


// Demmarage de serveur
let port = process.env.PORT || 5000

app.listen( port ,()=>{console.log("Démarage du serveur sur le port : "+port)})