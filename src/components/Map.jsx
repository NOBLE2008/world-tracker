import React, { useContext, useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { CityContext } from "../context/CityContext";
import useGeoLocation from "../../hooks/useGeoLocation";
import Spinner from "./Spinner";
import Button from "./Button";

export default function Map() {
  const { currentCity } = useContext(CityContext);
  const { cities } = useContext(CityContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { position, dispatch } = useContext(CityContext);
  const [useMyPosition, setUseMyPosition] = useState(false);

  const [error, isLoading, geoPosition, getPosition] = useGeoLocation();
  const handleUsePosition = () => {
    getPosition();
    setUseMyPosition(true);
  };

  useEffect(() => {
    if (geoPosition === null) return;
    dispatch({type: 'changePosition', payload: geoPosition});
  }, [geoPosition, dispatch]);

  if (isLoading) return <Spinner />;
  if (error) return <h3>Error Loading Live location</h3>;
  return (
    <div className={styles.mapContainer}>
      <Button onClick={handleUsePosition} type="position">
        {isLoading ? "Loading..." : "Use your Location"}
      </Button>
      <MapContainer
        center={[position[0] || 37.0902, position[1] || 95.7129]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          const { lat, lng } = city.position;
          const { cityName } = city;
          return (
            <Marker key={cityName} position={[lat, lng]}>
              <Popup>{cityName}</Popup>
            </Marker>
          );
        })}
        <ChangeCenter
          position={
            useMyPosition
              ? position
              : [
                  lat ||
                    currentCity?.position?.lat ||
                    cities[0]?.position?.lat ||
                    position[0] ||
                    37.0902,
                  lng ||
                    currentCity?.position?.lng ||
                    cities[0]?.position?.lng ||
                    position[1] ||
                    95.7129,
                ]
          }
        />
        <DetectClick />
      </MapContainer>
    </div>
  );

  function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
      click: (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
    });
  }
}
