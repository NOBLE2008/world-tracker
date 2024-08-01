import React, { useContext } from "react";
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

export default function Map() {
  const { currentCity } = useContext(CityContext);
  const { cities } = useContext(CityContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [error, isLoading, position] = useGeoLocation();

  if (isLoading) return <Spinner />;
  if(error) return <h3>Error Loading Live location</h3>
  return (
    <div className={styles.mapContainer}>
      <div className={styles.map}>
        <MapContainer
          center={position}
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
            position={[
              lat ||
                currentCity?.position?.lat ||
                cities[0]?.position?.lat ||
                position[0] || 40,
              lng ||
                currentCity?.position?.lng ||
                cities[0]?.position?.lng ||
                position[1] || 0,

            ]}
          />
          <DetectClick />
        </MapContainer>
      </div>
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
