import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Ouvrage() {

    const { id } = useParams();
    const [ouvrages, setOuvrages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchOuvrage = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:5000/api/getouvrage/${id}`);
            setOuvrages(response.data);            

          } catch (error) {
            setError('Error fetching ouvrages details');
          } finally {
            setLoading(false);
          }
        };
    
        fetchOuvrage();
      }, [id]);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;


      
  return (
    <div className="mt-4 ml-8 mr-8 p-4">
    {ouvrages ? (
      <>
        <h3 className="text-2xl text-center font-bold mb-4 p-4 rounded-xl bg-gray-50 capitalize shadow-md">{ouvrages.titre}</h3>
        <h3 className='mb-4'>Type</h3>
        <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md"> {ouvrages.type}</p>
        <h3 className='mb-4'>Disponibilite</h3>
        <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md"> {ouvrages.dispo? "Disponible" : "Non disponible"}</p>
        {
  ouvrages.type === "livres" ? (
    <>
      <h3 className='mb-4'>Exemplaire</h3>
      <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md">
        {ouvrages.exemplaires && ouvrages.exemplaires.length > 0 
          ? ouvrages.exemplaires.join(', ') 
          : 'vide'}
      </p>      <h3 className='mb-4'>Details</h3>
      <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md text-center"> Annee : {ouvrages.details.annee}</p>
      <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md text-center"> Edition : {ouvrages.details.edition}</p>
      <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md text-center"> Auteur : {ouvrages.details.auteur}</p>
    </>
  ) : (
    <>
    <h3 className='mb-4'>Details</h3>
    <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md "> date : {ouvrages.details.date}</p>
    <p className="text-xl mb-4 p-4 rounded-xl bg-gray-100 shadow-md "> periodicite : {ouvrages.details.periodicite}</p>
    </>
  )
}

      </>
    ) : (
      <p>Ouvrage not found</p>
    )}
  </div>
  )
}
