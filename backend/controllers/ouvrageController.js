const express = require("express");
const Ouvrage = require("../models/ouvragesModel")

// getAllouvrage

const getAllOuvrages = async (req, res) => {
    try {
      const ouvrages = await Ouvrage.find();
      res.status(200).json(ouvrages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//   addOuvrage

const addOuvrage = async (req, res) => {
    const { titre, dispo, type, exemplaires, details } = req.body;

    try {
      const nouvelOuvrage = new Ouvrage({
        titre: titre,
        dispo: dispo,
        type: type,
        exemplaires: exemplaires,
        details: details
      });
  
      const ouvrageAjouté = await nouvelOuvrage.save();
  
      res.status(201).json(ouvrageAjouté);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

//  getOuvrageById

const getOuvrageById = async (req,res) =>{
  try {
    const id = req.params.id;
    const ouvrage = await Ouvrage.findById(id);
    if (!ouvrage) {
      return res.status(404).json({ message: 'Ouvrage non trouvé' });
    }
    res.status(200).json(ouvrage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteOuvrage = async (req, res) => {
  try {
    const id = req.params.id;
    const ouvrageSupprimé = await Ouvrage.findByIdAndDelete(id);
    if (!ouvrageSupprimé) {
      return res.status(404).json({ message: 'Ouvrage non trouvé' });
    }
    res.status(200).json({ message: 'Ouvrage supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateOuvrage = async (req, res) => {
  const { titre, dispo, type, exemplaires, details } = req.body;
  try {
    const id = req.params.id;
    const ouvrageMisAJour = await Ouvrage.findByIdAndUpdate(
      id,
      { titre, dispo, type, exemplaires, details },
      { new: true, runValidators: true }
    );
    if (!ouvrageMisAJour) {
      return res.status(404).json({ message: 'Ouvrage non trouvé' });
    }
    res.status(200).json(ouvrageMisAJour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchOuvrageByTitle = async (req, res) => {
  const { titre } = req.query;
  try {
    const ouvrages = await Ouvrage.find({ titre: { $regex: titre, $options: 'i' } });
    if (ouvrages.length === 0) {
      return res.status(404).json({ message: 'Aucun ouvrage trouvé' });
    }
    res.status(200).json(ouvrages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  
module.exports = {
    getAllOuvrages,
    getOuvrageById,
    addOuvrage,
    deleteOuvrage,
    updateOuvrage,
    searchOuvrageByTitle
  };
  