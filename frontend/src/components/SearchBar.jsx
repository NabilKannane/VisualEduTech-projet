import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const searchOuvrages = async () => {
      if (debouncedTerm) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/api/searchouvrage?titre=${debouncedTerm}`
          );
          onSearch(response.data);
        } catch (error) {
          console.error("Error searching ouvrages", error);
        }
      }
      if(debouncedTerm == ''){
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/api/getouvrages`
          );
          onSearch(response.data);
        } catch (error) {
          console.error("Error searching ouvrages", error);
        }
      }
    };

    searchOuvrages();
  }, [debouncedTerm, onSearch]);

  return (
    <div className="relative">
      <input
        placeholder="Search..."
        className="input shadow-lg focus:border-1 border-gray-300 px-5 py-3 rounded-xl w-[450px] transition-all focus:w-[450px] outline-none"
        name="search"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <svg
        className="size-6 absolute top-3 right-3 text-gray-500"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
}
