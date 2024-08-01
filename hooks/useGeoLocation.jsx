import React, { useEffect, useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(null);

  const [error, setError] = useState(null);

  function getPosition() {
    let position
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
         setPosition([pos.coords.latitude, pos.coords.longitude])
        setIsLoading(false);
        
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );

    console.log(position)

    return position
  }
  return [error, isLoading, position, getPosition];
}
