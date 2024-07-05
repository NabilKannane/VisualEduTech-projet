const express=require("express");

const ouvrageController = require('../controllers/ouvrageController');

const router = express.Router()


// les routes

router.get("/getouvrages", ouvrageController.getAllOuvrages)
router.get("/getouvrage/:id", ouvrageController.getOuvrageById)
router.post('/addouvrage', ouvrageController.addOuvrage);
router.put('/updateouvrage/:id', ouvrageController.updateOuvrage);
router.delete('/deleteouvrage/:id', ouvrageController.deleteOuvrage);
router.get("/searchouvrage", ouvrageController.searchOuvrageByTitle)

module.exports=router;