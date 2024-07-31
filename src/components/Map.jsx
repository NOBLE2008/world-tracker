import React, { useContext } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { CityContext } from "../context/CityContext";

export default function Map() {
  const { cities } = useContext(CityContext);

  const [searchParams, setSearchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  const position = [lat || 3.4360, lng || 55.3781];
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
        </MapContainer>
      </div>
    </div>
  );

}
