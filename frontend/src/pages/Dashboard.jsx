import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { LuTrash , LuPenLine } from "react-icons/lu";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [ouvrages, setOuvrages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOuvrages = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/getouvrages/"
        );
        setOuvrages(response.data);
      } catch (error) {
        console.error("Error fetching ouvrages", error);
      }
    };

    fetchOuvrages();
  }, []);

  const handleSearchResults = (results) => {
    setOuvrages(results);
  };

  const handleViewDetails = (ouvrageId) => {
    navigate(`/ouvrage/${ouvrageId}`);
  };

  const handleDelete = async (ouvrageId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/deleteouvrage/${ouvrageId}`);
      setOuvrages(ouvrages.filter((ouvrage) => ouvrage._id !== ouvrageId));
    } catch (error) {
      console.error("Error deleting ouvrage", error);
    }
  };

  const handleModify = (ouvrageId) => {
    navigate(`/editouvrage/${ouvrageId}`);
  };

  const handleAddOuvrage = () => {
    navigate('/newouvrage/');
  };

  return (
    <>
      <div className="mt-4 mb-12">
        <div className="ml-16 mr-16 mb-4 px-2 rounded-sm flex justify-between ">
          <h3 className="text-xl font-light">Listes Documents</h3>
          <SearchBar onSearch={handleSearchResults} />
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleAddOuvrage}
          >
            Add Document
          </button>
        </div>
      </div>

      <div className="mt-4 ml-10 mr-8 px-2">
        {ouvrages.length > 0 ? (
          ouvrages.map((ouvrage) => (
            <div key={ouvrage._id} className={`flex rounded-md border p-4 mb-4 ml-8 mr-8 justify-between shadow-lg bg-blue-100 hover:bg-blue-200`}>
              <div>
                <h4
                  className="text-xl capitalize font-semibold mb-2 ml-4"
                  onClick={() => handleViewDetails(ouvrage._id)}
                >
                  {ouvrage.titre}
                </h4>
                <p className="mb-2 ml-4">Type : {ouvrage.type}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleModify(ouvrage._id)}
                  className={`mr-2 p-2 text-neutral-900 rounded-md focus:outline-none bg-neutral-100`}
                >
                  <LuPenLine />
                </button>
                <button
                  onClick={() => handleDelete(ouvrage._id)}
                  className={`mr-2 p-2 text-neutral-900 rounded-md focus:outline-none bg-neutral-100`}
                >
                  <LuTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No documents available</p>
        )}
      </div>
    </>
  );
}
