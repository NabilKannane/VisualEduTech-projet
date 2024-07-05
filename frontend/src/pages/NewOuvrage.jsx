import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export default function NewOuvrage() {
  const navigate = useNavigate();

  const [titre, setTitre] = useState("");
  const [dispo, setDispo] = useState(false);
  const [type, setType] = useState("livres");
  const [details, setDetails] = useState({});
  const [numExemp, setNumExemp] = useState(0);
  const [exemplaires, setexemplaires] = useState([]);
  

  useEffect(() => {
    setDispo(true);
  }, [numExemp]);

  useEffect(() => {
    setDetails({});
  }, [type]);

  const handleInputChange = (index, value) => {
    const newexemplaires = [...exemplaires];
    newexemplaires[index] = value;
    setexemplaires(newexemplaires);
    console.log(newexemplaires)
  };
  

  const handleDetailsChange = (e) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the newOuvrage object based on type
    let newOuvrage;
    if (type == "livres") {
      newOuvrage = {
        titre,
        dispo,
        type,
        exemplaires,
        details,
      };
    } else if (type == "periodique") {
      newOuvrage = {
        titre,
        dispo,
        type,
        details,
      };
    }

    console.log(newOuvrage);

    try {
      await axios.post("http://127.0.0.1:5000/api/addouvrage", newOuvrage);
      alert("Ouvrage ajouté avec succès !");
      navigate("/home")
    } catch (error) {
      console.error("Error adding Document", error);
      alert("Erreur lors de l'ajout du Ouvrage");
    }
  };

  const handleNumExempChange = (e) => {
    const value = parseInt(e.target.value);
    setNumExemp(value);
    setexemplaires(Array(value).fill(""));
  };

  return (
    <div className="items-center justify-around min-h-screen bg-gray-100 flex">
      <div className="w-1/2 max-w-lg bg-white p-5 rounded-lg shadow-md">
        <h3 className="mb-8 font-semibold text-xl">Create new Document</h3>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="titre"
            >
              Titre
            </label>
            <input
              type="text"
              id="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="livres">Livres</option>
              <option value="periodique">Periodique</option>
            </select>
          </div>
          {( type == "livres")?<>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numExemp"
            >
              Numero des exemplaires
            </label>
            <input
              type="number"
              id="numExemp"
              min={0}
              max={3}
              value={numExemp}
              onChange={handleNumExempChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          </>:<></>}
          {( type == "livres")?<>
          {Array.from({ length: numExemp }).map((_, index) => (
            <div className="mb-4" key={index}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`endDate${index}`}
              >
                exemplaires {index + 1}
              </label>
              <input
                type="text"
                id={`endDate${index}`}
                value={exemplaires[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}</>:<></>}

          <label
            className="block text-gray-700 text-center text-sm font-light mb-2 bg-blue-50"
            htmlFor="type"
          >
            Details
          </label>
          {/* ########### Livres details */}
          {type == "livres" ? (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="annee"
                >
                  Annee
                </label>
                <input
                  type="number"
                  id="annee"
                  value={details.annee || ""}
                  onChange={handleDetailsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="edition"
                >
                  Edition
                </label>
                <input
                  type="text"
                  id="edition"
                  value={details.edition || ""}
                  onChange={handleDetailsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="auteur"
                >
                  Auteur
                </label>
                <input
                  type="text"
                  id="auteur"
                  value={details.auteur || ""}
                  onChange={handleDetailsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  date
                </label>
                <input
                  type="date"
                  id="date"
                  value={details.date || ""}
                  onChange={handleDetailsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="peridicite"
                >
                  Peridicite
                </label>
                <select
                  id="peridicite"
                  name="peridicite"
                  value={details.peridicite || ""}
                  onChange={handleDetailsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="hebdomadaire">hebdomadaire</option>
                  <option value="mensuel">mensuel</option>
                  <option value="journalier">journalier</option>
                </select>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="dispo"
                  checked={dispo}
                  onChange={(e) => setDispo(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-sm"
                />
                <label
                  htmlFor="dispo"
                  className="ml-2 block text-gray-700 text-sm font-bold"
                >
                  Disponibility
                </label>
              </div>
            </>
          )}
          {/* ###################################3 */}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Document
            </button>
          </div>
        </form>
      </div>
      <div className="w-2/6">
        <img
          src="https://images.unsplash.com/photo-1601469090980-fc95e8d95544?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
          alt="Project"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
}
