import React, { createContext, useEffect, useState } from "react";

const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CityContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        getCity,
        currentCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export { CityContext, CityProvider };