const mongoose = require('mongoose');

const ouvragesModel = new mongoose.Schema({
  titre: {
      type: String,
      required: true
  },
  dispo: {
    type: Boolean,
    required: true
},
  type: {
      type: String,
      enum : ['periodique','livres'],
      required: true 
  },
  exemplaires: { type: [String], default: undefined }, // Champ facultatif
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true
}
});

const Ouvrage = mongoose.model('ouvrage', ouvragesModel);

module.exports = Ouvrage;