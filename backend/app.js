const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
app.use(cors());

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" })); // Handle JSON data with a limit of 50MB
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/", authRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be saved in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // req.file contains the information about the uploaded video
  const uploadedVideoPath = req.file.path;
  const targetFilePath = process.env.PATH_VIDEO + req.file.originalname; // Destination file path

  // Move the uploaded video to the destination folder
  fs.rename(uploadedVideoPath, targetFilePath, (err) => {
    if (err) {
      console.log(targetFilePath);
      console.error("Error moving file:", err);
      return res.status(500).send("Error uploading file");
    }
    console.log("File uploaded successfully");
    res.status(200).send("File uploaded successfully");
  });
});

//

// ######################################
let datavideo = null;

app.post("/api/videoData", (req, res) => {
  datavideo = req.body;
  console.log("Données reçues :", datavideo);

  const dataString = JSON.stringify(datavideo, null, 2);
  fs.writeFile("data.json", dataString, "utf8", (err) => {
    if (err) {
      console.error(
        "Erreur lors de l'écriture des données dans le fichier:",
        err
      );
    } else {
      console.log("Données enregistrées avec succès dans data.json");
    }
  });
});

app.post("/api/getvideodata", (req, res) => {
  // Lire le fichier data.json
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier:", err);
      res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
      return;
    }

    // Envoyer les données lues en tant que réponse
    res.json(JSON.parse(data));
  });
});


app.get("/api/getvideodata", (req, res) => {
  const repertoireImages = path.join(__dirname, '..', 'SmartEdu', 'kafka_hadoop_spark_hive', 'src', 'images');
  const repertoireImages2 = path.join(__dirname, '..', 'SmartEdu', 'kafka_hadoop_spark_hive', 'src', 'images', 'egalisation_histo');

  // Use Promise.all to handle multiple asynchronous operations
  Promise.all([
      readDirectory(repertoireImages),
      readDirectory(repertoireImages2)
  ])
  .then(([fichiers, fichiers2]) => {
      // Filter files to keep only those with image extensions
      const imageFiles = fichiers.filter(file => isImageFile(file));
      const imageFiles2 = fichiers2.filter(file => isImageFile(file));
      console.log("OK")
      res.json({ fichiers: imageFiles, fichiers2: imageFiles2 });
  })
  .catch(err => {
      console.error('Erreur lors de la lecture des répertoires:', err);
      res.status(500).json({ error: 'Erreur serveur' });
  });
});




// Function to check if a file has an image extension
function isImageFile(file) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const extension = path.extname(file).toLowerCase();
  return imageExtensions.includes(extension);
}

// Function to read directory asynchronously
function readDirectory(directory) {
  return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
          if (err) {
              reject(err);
          } else {
              resolve(files);
          }
      });
  });
}



// ##############################################333
// Function to convert image to base64
function imageToBase64(filePath) {
  // Read image file as a buffer
  const buffer = fs.readFileSync(filePath);
  // Convert buffer to base64
  const base64 = buffer.toString('base64');
  return base64;
}


// Route to handle image conversion
app.get('/convertImage', (req, res) => {
  const imageName = req.query.name; // Extract the image name from the query parameters
    if (!imageName) {
        return res.status(400).send('Image name is missing in the URL query parameter');
    }

    let folder = req.query.folder; // Extract the image name from the query parameters
 

    let imagePath =""
    if (!folder) {
      // return res.status(400).send('folder name is missing in the URL query parameter');
      imagePath = path.join(process.cwd(),'../SmartEdu/kafka_hadoop_spark_hive/src/images',imageName);
  }   
  else{
    imagePath = path.join(process.cwd(),'../SmartEdu/kafka_hadoop_spark_hive/src/images',folder,imageName);

  }
     // Join cwd with the image name
    try {
        const base64Image = imageToBase64(imagePath);
        res.send(base64Image);
    } catch (error) {
        console.error('Error converting image to base64:', error);
        res.status(500).send('Internal Server Error');
    }
});

// 




app.use(function (req, res) {
  res.status(400).send("<h1>Page Not Found !</h1>");
});

module.exports = app;
