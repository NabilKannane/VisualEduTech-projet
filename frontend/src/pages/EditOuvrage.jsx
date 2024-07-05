import React, { useState, useEffect} from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";

export default function EditOuvrage() {
  const { id } = useParams(); // Assume that the route is like /edit/:id
  const [titre, setTitre] = useState("");
  const [dispo, setDispo] = useState(false);
  const [type, setType] = useState("livres");
  const [details, setDetails] = useState({});
  const [numExemp, setNumExemp] = useState(0);
  const [exemplaire, setExemplaire] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing ouvrage data
    const fetchOuvrage = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/getouvrage/${id}`);
        const data = response.data;
        setTitre(data.titre);
        setDispo(data.dispo);
        setType(data.type);
        setDetails(data.details);
        setExemplaire(data.exemplaire || []);
        setNumExemp(data.exemplaire ? data.exemplaire.length : 0);
      } catch (error) {
        console.error("Error fetching ouvrage", error);
      }
    };
    fetchOuvrage();
  }, [id]);

  useEffect(() => {
    setDispo(true);
  }, [numExemp]);

  useEffect(() => {
    setDetails({});
  }, [type]);

  const handleInputChange = (index, value) => {
    const newExemplaire = [...exemplaire];
    newExemplaire[index] = value;
    setExemplaire(newExemplaire);
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

    // Prepare the updatedOuvrage object based on type
    let updatedOuvrage;
    if (type === "livres") {
      updatedOuvrage = {
        titre,
        dispo,
        type,
        exemplaire,
        details,
      };
    } else if (type === "periodique") {
      updatedOuvrage = {
        titre,
        dispo,
        type,
        details,
      };
    }

    console.log(updatedOuvrage);

    try {
      await axios.put(`http://127.0.0.1:5000/api/updateouvrage/${id}`, updatedOuvrage);
      alert("Ouvrage modifié avec succès !");
      navigate("/home")
      
    } catch (error) {
      console.error("Error updating ouvrage", error);
      alert("Erreur lors de la modification de l'ouvrage");
    }
  };

  const handleNumExempChange = (e) => {
    const value = parseInt(e.target.value);
    setNumExemp(value);
    setExemplaire(Array(value).fill(""));
  };

  return (
    <div className="items-center justify-around min-h-screen bg-gray-100 flex">
      <div className="w-1/2 max-w-lg bg-white p-5 rounded-lg shadow-md">
        <h3 className="mb-8 font-semibold text-xl">Edit Document</h3>
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
          {(type === "livres") && (
            <>
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
              {Array.from({ length: numExemp }).map((_, index) => (
                <div className="mb-4" key={index}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`exemplaire${index}`}
                  >
                    Exemplaire {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`exemplaire${index}`}
                    value={exemplaire[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              ))}
            </>
          )}
          <label
            className="block text-gray-700 text-center text-sm font-light mb-2 bg-blue-50"
            htmlFor="details"
          >
            Details
          </label>
          {type === "livres" ? (
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
                  Date
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
                  htmlFor="periodicite"
                >
                  Periodicite
                </label>
                <select
                  id="periodicite"
                  name="periodicite"
                  value={details.periodicite || ""}
                  onChange={handleDetailsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="hebdomadaire">Hebdomadaire</option>
                  <option value="mensuel">Mensuel</option>
                  <option value="journalier">Journalier</option>
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Document
            </button>
          </div>
        </form>
      </div>
      <div className="w-2/6">
        <img
          src="https://images.unsplash.com/photo-1601469090980-fc95e8d95544?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
          alt="Ouvrage"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
}
