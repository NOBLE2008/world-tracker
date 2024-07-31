import React, { useContext } from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { CityContext } from "../context/CityContext";

export default function CityList() {
  const { cities, setCities } = useContext(CityContext)
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return (
          <CityItem
            emoji={city.emoji}
            date={city.date}
            name={city.cityName}
            position={city.position}
            key={city.id}
            id={city.id}
            setCities={setCities}
          />
        );
      })}
    </ul>
  );
}
